package com.pm.notes_service.sync.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class SyncOperationDTO {
    private String operationId; //Unique ID for this specific offline action
    private UUID noteId;
    private String operation;  //"CREATE","UPDATE" OR "DELETE"
    private String title;
    private String content;
//    private Long version;// The version the client thinks it is editing
    private Long baseVersion;  //version during last sync
}
