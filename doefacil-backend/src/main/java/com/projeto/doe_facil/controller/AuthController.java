package com.projeto.doe_facil.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.doe_facil.dto.AuthRequest;
import com.projeto.doe_facil.dto.AuthResponse;
import com.projeto.doe_facil.dto.RegisterRequest;
import com.projeto.doe_facil.model.User;
import com.projeto.doe_facil.repository.UserRepository;
import com.projeto.doe_facil.service.JwtService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
  private final UserRepository userRepo;
  private final PasswordEncoder encoder;
  private final AuthenticationManager authManager;
  private final JwtService jwtService;

  @PostMapping("/register")
  public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req) {
    if (userRepo.findByEmail(req.getEmail()).isPresent()) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    var user = User.builder()
        .name(req.getName())
        .email(req.getEmail())
        .password(encoder.encode(req.getPassword()))
        .role(User.Role.USER)
        .build();
    userRepo.save(user);
    var token = jwtService.generateToken(user);
    return ResponseEntity.ok(new AuthResponse(token, user.getId(), user.getName(), user.getRole().name()));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest req) {
    var auth = new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword());
    authManager.authenticate(auth); // lança exceção se inválido
    var user = userRepo.findByEmail(req.getEmail()).orElseThrow();
    var token = jwtService.generateToken(user);
    return ResponseEntity.ok(new AuthResponse(token, user.getId(), user.getName(), user.getRole().name()));
  }
}
