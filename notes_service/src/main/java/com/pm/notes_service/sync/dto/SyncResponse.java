package com.pm.notes_service.sync.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class SyncResponse {
    private List<String> acceptedOperations=new ArrayList<>();
    private List<String> conflicts=new ArrayList<>();
}
