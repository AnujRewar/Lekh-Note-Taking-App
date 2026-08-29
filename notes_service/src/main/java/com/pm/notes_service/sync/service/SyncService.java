package com.pm.notes_service.sync.service;

import com.pm.notes_service.notes.entity.Note;
import com.pm.notes_service.notes.repository.NoteRepository;
import com.pm.notes_service.sync.dto.SyncOperationDTO;
import com.pm.notes_service.sync.dto.SyncPullResponse;
import com.pm.notes_service.sync.dto.SyncRequest;
import com.pm.notes_service.sync.dto.SyncResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SyncService {
    private final NoteRepository noteRepository;

    @Transactional //this will run the method in database
    public SyncResponse processSync(SyncRequest syncRequest) {
         SyncResponse syncResponse=new SyncResponse();
         for(SyncOperationDTO op: syncRequest.getChanges()){
             try{
                 if("CREATE".equals(op.getOperation())){
                     handleCreate(syncRequest.getUserId(),op);
                     syncResponse.getAcceptedOperations().add(op.getOperation());
                 }
                 else if("UPDATE".equals(op.getOperation()) || "DELETE".equals(op.getOperation())){
                     boolean success=handleUpdateOrDelete(op);
                     if(success){
                         syncResponse.getAcceptedOperations().add(op.getOperation());
                     }
                     else{
                         syncResponse.getConflicts().add(op.getOperation());
                     }
                 }
             }
             catch(Exception e){
                 // if the operation fails add that operation in conflicts
                 syncResponse.getConflicts().add(op.getOperation());
             }
         }
         return syncResponse;
    }

    @Transactional
    public void processLiveEdit(SyncOperationDTO op,UUID userId){
        try {
            if ("CREATE".equals(op.getOperation())) {
                handleCreate(userId, op);
            } else if ("UPDATE".equals(op.getOperation()) || "DELETE".equals(op.getOperation())) {
                handleUpdateOrDelete(op);
            }
        }
        catch(Exception e){
                System.err.println("Live edit conflict or error: "+ e.getMessage());
            }
        }

    public SyncPullResponse pullChanges(UUID userId, Instant lastSyncAt){
        List<Note> recentChanges=noteRepository.findByUserIdAndUpdatedAtAfter(userId,lastSyncAt);

        SyncPullResponse syncResponse=new SyncPullResponse();

        for(Note note:recentChanges){
            if(note.isDeleted()){
                syncResponse.getDeletedNotes().add(note.getId());
            }
            else{
                syncResponse.getUpdatedNotes().add(note);
            }
        }
        return syncResponse;
    }


    private void handleCreate(UUID userId,SyncOperationDTO op){
        Note note=new Note();
        note.setUserId(userId);
        note.setId(op.getNoteId());
        note.setTitle(op.getTitle());
        note.setContent(op.getContent());
        note.setVersion(1L);
        noteRepository.save(note);
    }
    private boolean handleUpdateOrDelete(SyncOperationDTO op){
        Optional<Note> existingNote=noteRepository.findById(op.getNoteId());
        if(existingNote.isEmpty()){
            return false;
        }

        Note note=existingNote.get();

        if(!note.getVersion().equals(op.getBaseVersion())){
             return false;
        }

        if("DELETE".equals(op.getOperation())){
            note.setDeleted(true);
        }
        else{
            note.setTitle(op.getTitle());
            note.setContent(op.getContent());
        }
        note.setVersion(note.getVersion()+1);
        noteRepository.save(note);
        return true;
    }
}
