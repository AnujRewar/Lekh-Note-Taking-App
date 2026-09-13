package com.pm.notes_service.notes.service;

import com.pm.notes_service.User.service.UserService;
import com.pm.notes_service.notes.dto.NoteMetaDataDTO;
import com.pm.notes_service.notes.dto.NoteRequest;
import com.pm.notes_service.notes.entity.Note;
import com.pm.notes_service.notes.repository.NoteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    private final UserService userService;
    public NoteService(NoteRepository noteRepository, UserService userService) {
        this.noteRepository = noteRepository;
        this.userService = userService;
    }

    public Note createNote(NoteRequest noteRequest,String userEmail) {

        UUID userId=userService.getUserIdFromEmail(userEmail);
        Note note=new Note();
        note.setUserId(userId);
        note.setTitle(noteRequest.getTitle());
        note.setContent(noteRequest.getContent());
        note.setFileType(noteRequest.getFileType() != null ? noteRequest.getFileType() : "TEXT");
        return noteRepository.save(note);
    }

    public List<NoteMetaDataDTO> getNotesByUser(UUID userId){
        return noteRepository.findByUserIdAndDeletedFalse(userId)
                .stream()
                .map(note->{
                    NoteMetaDataDTO dto = new NoteMetaDataDTO();
                    dto.setId(note.getId());
                    dto.setTitle(note.getTitle());
                    dto.setFileType(note.getFileType());
                    dto.setVersion(note.getVersion());
                    dto.setUpdatedAt(note.getUpdatedAt());
                    dto.setDeleted(note.isDeleted());
                    return dto;
                })
                .toList();
    }

    public Note getNoteById(UUID noteId){
        return noteRepository.findByIdAndDeletedFalse(noteId).orElseThrow(
                ()->new RuntimeException("Note not found!"));
    }

    public Note updateNote(UUID uuid,NoteRequest noteRequest){
        Note existingNote=getNoteById(uuid);
        if (noteRequest.getTitle() != null && !noteRequest.getTitle().isBlank()) {
            existingNote.setTitle(noteRequest.getTitle());
        }
        if (noteRequest.getContent() != null) {
            existingNote.setContent(noteRequest.getContent());
        }

        existingNote.setVersion(existingNote.getVersion()+1); // updating version to track changes in note and make aware
        return noteRepository.save(existingNote);             // devices that some chages are done
    }

    @Transactional
    public void saveCanvasContent(Long noteId, Long userId, String newContent) {
        int updatedRows = noteRepository.updateNoteContent(noteId, userId, newContent);

        if (updatedRows == 0) {
            throw new RuntimeException("Note not found or you do not have permission to edit this note.");
        }
    }

    public void deleteNode(UUID uuid){
        Note note=getNoteById(uuid);
        note.setDeleted(true);
        note.setVersion(note.getVersion()+1);
        noteRepository.save(note);
    }
}
