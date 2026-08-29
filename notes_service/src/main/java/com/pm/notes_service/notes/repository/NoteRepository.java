package com.pm.notes_service.notes.repository;

import com.pm.notes_service.notes.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;


import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NoteRepository  extends JpaRepository<Note, UUID> {
    //Fetching Users all notes and ignoring deleted ones
    List<Note> findByUserIdAndDeletedFalse(UUID userId);  //to retrieve active notes belonging to user

    Optional<Note> findByIdAndDeletedFalse(UUID id);  //retrieve specific note ensuring it has not deleted

    List<Note> findByUserIdAndUpdatedAtAfter(UUID userId, Instant lastSyncedAt);
}
