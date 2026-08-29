package com.pm.notes_service.notes.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class NoteMetaDataDTO {
    private UUID id;
    private String title;
    private String fileType;
    private Long version;
    private Instant updatedAt;
    private boolean deleted;
}
