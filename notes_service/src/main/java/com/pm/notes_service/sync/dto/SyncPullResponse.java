package com.pm.notes_service.sync.dto;

import com.pm.notes_service.notes.entity.Note;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class SyncPullResponse {
    private List<Note> updatedNotes=new ArrayList<>();
    private List<UUID> deletedNotes=new ArrayList<>();
}
