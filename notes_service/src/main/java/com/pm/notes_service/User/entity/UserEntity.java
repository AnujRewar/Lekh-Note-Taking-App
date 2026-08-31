package com.pm.notes_service.User.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@Entity
@Data
@Builder
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true,nullable=false)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String username;  //email

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean isActive;

}
