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
    Optional<UserEntity> findByEmailAndIsActive(String email, boolean active);
    Optional<UserEntity> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("""
    UPDATE UserEntity u
    SET u.password = :password
    WHERE u.email = :email
""")
    void updatePasswordByEmail(
            @Param("email") String email,
            @Param("password") String password
    );
}
