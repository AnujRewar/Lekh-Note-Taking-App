package com.pm.notes_service.sync.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class SyncRequest {
    private UUID userId;
    private String deviceId;
    private List<SyncOperationDTO> changes;

}
