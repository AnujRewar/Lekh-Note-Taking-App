package com.pm.notes_service.User.dto;

import lombok.Data;


public record ChangePassword(String password,String repeatPassword,String email) {

}
