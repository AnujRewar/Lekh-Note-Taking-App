package com.pm.notes_service.User.repository;

import com.pm.notes_service.User.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByUsernameAndIsActive(String username, boolean isActive);
    Optional<UserEntity> findByUsername(String username);
}
