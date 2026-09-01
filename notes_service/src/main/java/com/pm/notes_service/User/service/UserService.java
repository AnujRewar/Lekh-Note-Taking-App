package com.pm.notes_service.User.service;

import com.pm.notes_service.User.entity.UserEntity;
import com.pm.notes_service.User.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {


    public final UserRepository userRepository;

    public UserEntity getUserFromUsername(String email){
        return userRepository.findByEmailAndIsActive(email,true)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       UserEntity user = getUserFromUsername(email);
       return User.builder()
               .username(user.getEmail())
               .password(user.getPassword())
               .authorities(Collections.emptyList())
               .build();
    }
}
