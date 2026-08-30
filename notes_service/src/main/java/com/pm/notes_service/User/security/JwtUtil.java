package com.pm.notes_service.User.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

@Component
public class JwtUtil {

    //using secure key in production (load from application.properties)
    private final String SECRET_KEY = "ThisIsASuperSecretKeyThatNeedsToBeAtLeast32BytesLong!";
    private final Key key= Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    private final long EXPIRATION_TIME = 864_000_000;

    public String generateToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .addClaims(new HashMap<>())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .signWith(key,SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims verifySignatureAndExtractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token){
        return verifySignatureAndExtractAllClaims(token).getSubject();
    }

    public Date getExpiration(String token){
        return verifySignatureAndExtractAllClaims(token).getExpiration();
    }

    public boolean isTokenExpired(String token){
       return getExpiration(token).before(new Date());
    }
    //required for validating incoming jwt tokens
    public Key getKey(){
        return key;
    }

}
