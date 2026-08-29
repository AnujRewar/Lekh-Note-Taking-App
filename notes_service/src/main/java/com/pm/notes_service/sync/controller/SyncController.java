package com.pm.notes_service.sync.controller;

import com.pm.notes_service.notes.entity.Note;
import com.pm.notes_service.sync.dto.SyncPullResponse;
import com.pm.notes_service.sync.dto.SyncRequest;
import com.pm.notes_service.sync.dto.SyncResponse;
import com.pm.notes_service.sync.service.SyncService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/sync")
@RequiredArgsConstructor
public class SyncController {
    private final SyncService syncService;

    @PostMapping("/push")
    public ResponseEntity<SyncResponse> push(@RequestBody SyncRequest syncRequest) {
          return ResponseEntity.ok(syncService.processSync(syncRequest));
    }

    @GetMapping("/pull")
    public ResponseEntity<SyncPullResponse> pull(@RequestParam UUID userId, @RequestParam String lastSyncedAt) {
        java.time.Instant timestamp = java.time.Instant.parse(lastSyncedAt);
        SyncPullResponse syncPullResponse = syncService.pullChanges(userId, timestamp);
        return ResponseEntity.ok(syncPullResponse);
    }

}
