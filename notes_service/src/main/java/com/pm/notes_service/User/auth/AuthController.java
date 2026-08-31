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
import java.util.Date;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

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
        if(userRepository.findByUsername(registerRequest.getUsername()).isPresent()){
               return ResponseEntity
                       .status(HttpStatus.BAD_REQUEST)
                       .body(Map.of("error","Username is already taken!"));
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(registerRequest.getUsername());
        userEntity.setFullName(registerRequest.getFullName());
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

    @PostMapping("/verifyEmail")
      public ResponseEntity<?> verifyEmail(@RequestBody VerifyEmail verifyEmail){
        System.out.print(verifyEmail.getEmail());
        UserEntity user =userRepository.findByUsername(verifyEmail.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("No such username exists"));


        int otp=otpGenerator();
        MailBody mailBody= MailBody.builder()
                .to(user.getUsername())
                .text("This is the otp for your Password reset request: "+ otp+System.lineSeparator() +" Thanks for choosing Lekh.")
                .subject("Lekh - Note Taking App "+System.lineSeparator() +" OTP for password reset request")
                .build();

        ForgetPassword fp=ForgetPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis()+ 70 * 5000))
                .build();

          emailService.sendSimpleMessage(mailBody);

          forgetPasswordRepository.save(fp);

          return ResponseEntity.status(HttpStatus.OK).body(Map.of("message","OTP has been sent"));


      }

      @PostMapping("/verifyOtp")
      public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest verifyOtpRequest){
          System.out.println(verifyOtpRequest.getEmail());
          System.out.println(verifyOtpRequest.getOtp());

//        UserEntity user =userRepository.findByUsername(verifyOtpRequest.getEmail())
//                .orElseThrow(()->new UsernameNotFoundException("Please provide a valid email"));

        ForgetPassword fp=forgetPasswordRepository.findByOtpAndUsername(verifyOtpRequest.getOtp(), verifyOtpRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Invalid OTP for email: "+verifyOtpRequest.getEmail()));

        if(fp.getExpirationTime().before(Date.from(Instant.now()))){
            forgetPasswordRepository.deleteById(fp.getFpid());
            return new ResponseEntity<>(Map.of("message","OTP has expired"), HttpStatus.EXPECTATION_FAILED                    );
        }

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message","OTP verified successfully"));
      }

      @PostMapping("/changePassword")
      public ResponseEntity<?> changePassword(@RequestBody ChangePassword changePassword){
         if(!Objects.equals(changePassword.password(),changePassword.repeatPassword())){
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error","Passwords do not match"));
         }
        String updatedPassword= passwordEncoder.encode(changePassword.password());
         userRepository.updatePasswordByUsername(changePassword.email(),updatedPassword);
         return ResponseEntity.status(HttpStatus.OK).body(Map.of("message","Password changed successfully"));
      }


      private Integer otpGenerator(){
        Random random = new Random();
        return random.nextInt(100000,999999);
      }





    
}
