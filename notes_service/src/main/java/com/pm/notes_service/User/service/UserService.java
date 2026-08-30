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

    public UserEntity getUserFromUsername(String username){
        return userRepository.findByUsernameAndIsActive(username,true)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       UserEntity user = getUserFromUsername(username);
       return User.builder()
               .username(user.getUsername())
               .password(user.getPassword())
               .authorities(Collections.emptyList())
               .build();
    }
}
