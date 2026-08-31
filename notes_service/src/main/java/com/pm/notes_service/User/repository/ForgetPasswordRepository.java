package com.pm.notes_service.User.repository;

import com.pm.notes_service.User.entity.ForgetPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ForgetPasswordRepository extends JpaRepository<ForgetPassword, Long> {

    @Query("""
        SELECT f
        FROM ForgetPassword f
        WHERE f.otp = :otp
        AND f.user.username = :email
    """)
    Optional<ForgetPassword> findByOtpAndUsername(
            @Param("otp") Integer otp,
            @Param("email") String email
    );

//    Optional<ForgetPassword> deleteByFpid(Long fpid);
}
