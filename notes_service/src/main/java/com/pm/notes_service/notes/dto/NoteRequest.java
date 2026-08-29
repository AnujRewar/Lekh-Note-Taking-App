package com.pm.notes_service.notes.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class NoteRequest {
    private UUID userId;
    private String title;
    private String content;
}
