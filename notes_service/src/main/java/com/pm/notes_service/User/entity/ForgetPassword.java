package com.pm.notes_service.User.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ForgetPassword {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fpid;

     @Column(nullable = false)
    private Integer otp;

     @Column(nullable = false)
    private Date expirationTime;

    @OneToOne
    private UserEntity user;
}
