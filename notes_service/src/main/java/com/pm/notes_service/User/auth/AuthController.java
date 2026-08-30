package com.pm.notes_service.User.auth;

import com.pm.notes_service.User.dto.LoginRequest;
import com.pm.notes_service.User.dto.RegisterRequest;
import com.pm.notes_service.User.entity.UserEntity;
import com.pm.notes_service.User.repository.UserRepository;
import com.pm.notes_service.User.security.JwtUtil;
import com.pm.notes_service.User.security.SecurityConfig;
import com.pm.notes_service.User.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final SecurityConfig securityConfig;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest){
        if(userRepository.findByUsername(registerRequest.getUsername()).isPresent()){
               return ResponseEntity
                       .status(HttpStatus.BAD_REQUEST)
                       .body(Map.of("error","Username is already taken!"));
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(registerRequest.getUsername());
        userEntity.setPassword(passwordEncoder.encode(registerRequest.getPassword()));//encode the received password
        userEntity.setActive(true);
        userRepository.save(userEntity);

        return ResponseEntity.ok().body(Map.of("message","User registered successfully!"));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest){
        try {
            Authentication authentication = authenticationManager.authenticate(   // this will go and authenticate
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername()
                            , loginRequest.getPassword()));

        String token=jwtUtil.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok().body(Map.of("token",token));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }


    }



    
}
