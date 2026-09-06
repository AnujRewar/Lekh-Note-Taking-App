package com.pm.notes_service.User.auth;

import com.pm.notes_service.User.dto.*;
import com.pm.notes_service.User.entity.ForgetPassword;
import com.pm.notes_service.User.entity.UserEntity;
import com.pm.notes_service.User.repository.ForgetPasswordRepository;
import com.pm.notes_service.User.repository.UserRepository;
import com.pm.notes_service.User.security.JwtUtil;
import com.pm.notes_service.User.security.SecurityConfig;
import com.pm.notes_service.User.service.EmailService;
import com.pm.notes_service.User.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

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
    private final EmailService emailService;
    private final ForgetPasswordRepository forgetPasswordRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest){
        if(userRepository.findByEmail(registerRequest.getEmail()).isPresent()){
               return ResponseEntity
                       .status(HttpStatus.BAD_REQUEST)
                       .body(Map.of("error","Username is already taken!"));
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(registerRequest.getEmail());
        userEntity.setFullName(registerRequest.getFullName());
        userEntity.setPassword(passwordEncoder.encode(registerRequest.getPassword()));//encode the received password
        userEntity.setActive(false);
        userRepository.save(userEntity);

        // Automatically generate and dispatch the registration OTP
        int otp = otpGenerator();
        MailBody mailBody = MailBody.builder()
                .to(userEntity.getEmail())
                .text("Your verification code is: " + otp + System.lineSeparator() + "Welcome to Lekh!")
                .subject("Lekh - Account Verification OTP")
                .build();

        ForgetPassword fp = ForgetPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 5 * 60 * 1000))
                .user(userEntity)
                .build();

        emailService.sendSimpleMessage(mailBody);
        forgetPasswordRepository.save(fp);

        return ResponseEntity.ok().body(Map.of("message","User registered successfully!"));
    }

    // loging in
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest){
        try {
            Authentication authentication = authenticationManager.authenticate(   // this will go and authenticate
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail()
                            , loginRequest.getPassword()));

        String token=jwtUtil.generateToken(loginRequest.getEmail());
        Optional<UserEntity> userEntity=userRepository.findByEmail(loginRequest.getEmail());
        UserEntity user=userEntity.get();
        return ResponseEntity.ok().body(Map.of("token",token,
                "email", user.getEmail(),
                "name", user.getFullName() != null ? user.getFullName() : user.getEmail().split("@")[0]));
        }
        catch (Exception e){
            System.out.println("Auth Error: "+e.getClass().getName()+": "+e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/verifyEmail")
      public ResponseEntity<?> verifyEmail(@RequestBody VerifyEmail verifyEmail){

        if (verifyEmail == null || verifyEmail.getEmail() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Email is required"));
        }
        Optional<UserEntity> userOpt =userRepository.findByEmail(verifyEmail.getEmail());

        if(userOpt.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "No such username exists"));
        }

        UserEntity user = userOpt.get();
        int otp=otpGenerator();
        MailBody mailBody= MailBody.builder()
                .to(user.getEmail())
                .text("This is the otp for your Password reset request: "+ otp+System.lineSeparator() +" Thanks for choosing Lekh.")
                .subject("Lekh - Note Taking App "+System.lineSeparator() +" OTP for password reset request")
                .build();


        ForgetPassword fp;

        Optional<ForgetPassword> existingFp = forgetPasswordRepository.findByUser(user);

        if (existingFp.isPresent()) {
            // Update the existing row instead of inserting a duplicate
            fp = existingFp.get();
            fp.setOtp(otp);
            fp.setExpirationTime(new Date(System.currentTimeMillis() + 5 * 60 * 1000));
        } else {
            // Create a new row if none exists yet
            fp = ForgetPassword.builder()
                    .otp(otp)
                    .expirationTime(new Date(System.currentTimeMillis() + 5 * 60 * 1000))
                    .user(user)
                    .build();
        }
          emailService.sendSimpleMessage(mailBody);

          forgetPasswordRepository.save(fp);

          return ResponseEntity.status(HttpStatus.OK).body(Map.of("message","OTP has been sent"));

      }

      @PostMapping("/verifyOtp")
      public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest verifyOtpRequest){


          Optional<UserEntity> userOpt = userRepository.findByEmail(verifyOtpRequest.getEmail());
          if(userOpt.isEmpty()) {
              return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Please provide a valid email"));
          }

          Optional<ForgetPassword> fpOpt = forgetPasswordRepository.findByOtpAndEmail(verifyOtpRequest.getOtp(), verifyOtpRequest.getEmail());
          if(fpOpt.isEmpty()) {
              return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid OTP for email: " + verifyOtpRequest.getEmail()));
          }

          ForgetPassword fp = fpOpt.get();
          UserEntity user = userOpt.get();

        if(fp.getExpirationTime().before(Date.from(Instant.now()))){
            forgetPasswordRepository.deleteById(fp.getFpid());
            return new ResponseEntity<>(Map.of("message","OTP has expired"), HttpStatus.EXPECTATION_FAILED                    );
        }
        if(user.isActive()==false){
            user.setActive(true);
            userRepository.save(user);
        }
          try {
              forgetPasswordRepository.deleteById(fp.getFpid());
          } catch (Exception e) {
              System.out.println("Could not delete used OTP: " + e.getMessage());
          }

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message","OTP verified successfully"));
      }

      @PostMapping("/changePassword")
      public ResponseEntity<?> changePassword(@RequestBody ChangePassword changePassword){

        if(changePassword.email() == null || changePassword.email().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Email is required"));
        }
         if(!Objects.equals(changePassword.password(),changePassword.repeatPassword())){
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error","Passwords do not match"));
         }
         Optional<UserEntity> userOpt = userRepository.findByEmail(changePassword.email());
         if(userOpt.isEmpty()){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Please provide a valid email"));
         }
         try {
//             String updatedPassword = passwordEncoder.encode(changePassword.password());
//             userRepository.updatePasswordByEmail(changePassword.email(), updatedPassword);
             UserEntity entity=userOpt.get();

             entity.setPassword(passwordEncoder.encode(changePassword.password()));
             entity.setActive(true);
             userRepository.save(entity);

             return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Password changed successfully"));
         }
         catch (Exception e) {
// Print the true stack trace to your Spring Boot console
             e.printStackTrace();
             // Return the actual error message instead of guessing
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Error: " + e.getMessage()));         }
      }


      private Integer otpGenerator(){
        Random random = new Random();
        return random.nextInt(100000,999999);
      }





    
}
