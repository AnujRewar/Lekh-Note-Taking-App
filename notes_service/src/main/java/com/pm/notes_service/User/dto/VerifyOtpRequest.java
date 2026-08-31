package com.pm.notes_service.User.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyOtpRequest {
    private Integer otp;
    private String email;
}
