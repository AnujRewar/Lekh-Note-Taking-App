package com.pm.notes_service.User.security;

import com.pm.notes_service.User.entity.UserEntity;
import com.pm.notes_service.User.repository.UserRepository;
import io.jsonwebtoken.Jwt;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

@Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email=oAuth2User.getAttribute("email");
        String name=oAuth2User.getAttribute("name");


        UserEntity userEntity=userRepository.findByEmailAndIsActive(email,true).orElseGet(
                ()->{
                    UserEntity userEntity1=new UserEntity();
                    userEntity1.setEmail(email);
                    userEntity1.setFullName(name);
                    userEntity1.setActive(true);
                    userEntity1.setPassword(java.util.UUID.randomUUID().toString());
                    userRepository.save(userEntity1);
                    return userEntity1;
                }
        );


        String token= jwtUtil.generateToken(email);
        String redirectUrl=  "http://localhost:5173/oauth-success?token=" + token;

        getRedirectStrategy().sendRedirect(
                request,
                response,
                redirectUrl);

    }

}
