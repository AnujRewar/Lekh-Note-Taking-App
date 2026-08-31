package com.pm.notes_service.User.repository;

import com.pm.notes_service.User.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByUsernameAndIsActive(String username, boolean isActive);
    Optional<UserEntity> findByUsername(String username);

    @Modifying
    @Transactional
    @Query("""
    UPDATE UserEntity u
    SET u.password = :newPassword
    WHERE u.username = :username
""")
    void updatePasswordByUsername(
            @Param("username") String username,
            @Param("newPassword") String newPassword
    );
}
