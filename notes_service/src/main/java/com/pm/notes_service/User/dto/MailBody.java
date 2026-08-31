package com.pm.notes_service.User.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
public record MailBody(String to,String subject,String text) {
}
