package com.pm.notes_service.User.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String fullName;
}
