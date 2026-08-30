package com.pm.notes_service.User.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
      String authHeader= request.getHeader("Authorization");
      String token=null;

      if(authHeader!=null && authHeader.startsWith("Bearer ")){
          token=authHeader.substring(7);
      }
      if(token!=null && SecurityContextHolder.getContext().getAuthentication()==null){
          Claims claims = jwtUtil.verifySignatureAndExtractAllClaims(token);
          if(!jwtUtil.isTokenExpired(token)){
              UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                      = new UsernamePasswordAuthenticationToken(claims.getSubject(),null,null);

              usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
              SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
          }
      }

      filterChain.doFilter(request,response);

    }
}
