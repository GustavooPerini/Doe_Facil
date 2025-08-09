package com.projeto.doe_facil.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;


@Service
public class JwtService {
  @Value("${security.jwt.secret}")
  private String secret;

  public String generateToken(UserDetails user) {
    var now = new Date();
    var exp = new Date(now.getTime() + 1000L * 60 * 60 * 8); // 8h
    return Jwts.builder()
        .setSubject(user.getUsername())
        .setIssuedAt(now)
        .setExpiration(exp)
        .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
        .compact();
  }

  public String extractUsername(String token) {
    return getParser().parseClaimsJws(token).getBody().getSubject();
  }

  public boolean isValid(String token, UserDetails user) {
    var username = extractUsername(token);
    var exp = getParser().parseClaimsJws(token).getBody().getExpiration();
    return username.equals(user.getUsername()) && exp.after(new Date());
  }

  private JwtParser getParser() {
    return Jwts.parserBuilder()
        .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
        .build();
  }
}
