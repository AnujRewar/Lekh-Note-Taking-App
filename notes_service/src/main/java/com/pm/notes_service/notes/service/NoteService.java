package com.pm.notes_service.notes.service;

import com.pm.notes_service.notes.dto.NoteMetaDataDTO;
import com.pm.notes_service.notes.dto.NoteRequest;
import com.pm.notes_service.notes.entity.Note;
import com.pm.notes_service.notes.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NoteService {
    private final NoteRepository noteRepository;
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note createNote(NoteRequest noteRequest){
        Note note=new Note();
        note.setUserId(noteRequest.getUserId());
        note.setTitle(noteRequest.getTitle());
        note.setContent(noteRequest.getContent());
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
        existingNote.setTitle(noteRequest.getTitle());
        existingNote.setContent(noteRequest.getContent());

        existingNote.setVersion(existingNote.getVersion()+1); // updating version to track changes in note and make aware
        return noteRepository.save(existingNote);             // devices that some chages are done
    }

    public void deleteNode(UUID uuid){
        Note note=getNoteById(uuid);
        note.setDeleted(true);
        note.setVersion(note.getVersion()+1);
        noteRepository.save(note);
    }
}
