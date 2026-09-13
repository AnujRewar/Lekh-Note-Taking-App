package com.pm.notes_service.notes.repository;

import com.pm.notes_service.notes.entity.Note;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NoteRepository  extends JpaRepository<Note, UUID> {
    //Fetching Users all notes and ignoring deleted ones
    List<Note> findByUserIdAndDeletedFalse(UUID userId);  //to retrieve active notes belonging to user

    Optional<Note> findByIdAndDeletedFalse(UUID id);  //retrieve specific note ensuring it has not deleted

    List<Note> findByUserIdAndUpdatedAtAfter(UUID userId, Instant lastSyncedAt);
    @Modifying
    @Transactional
    @
            Query("UPDATE Note n SET n.content = :content, n.updatedAt = CURRENT_TIMESTAMP, n.version = n.version + 1 WHERE n.id = :id AND n.userId = :userId")
    int updateNoteContent(@
                                  Param("id") Long id, @Param("userId") Long userId, @Param("content") String content);
}
