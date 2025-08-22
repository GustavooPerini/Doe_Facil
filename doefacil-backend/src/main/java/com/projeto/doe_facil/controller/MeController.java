package com.projeto.doe_facil.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.doe_facil.dto.ChangePasswordRequest;
import com.projeto.doe_facil.dto.MeResponseDTO;
import com.projeto.doe_facil.dto.MeUpdateRequest;
import com.projeto.doe_facil.model.User;
import com.projeto.doe_facil.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/me")
@RequiredArgsConstructor
public class MeController {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    @GetMapping
    public MeResponseDTO get(@AuthenticationPrincipal User user) {
        return MeResponseDTO.of(userRepo.findById(user.getId()).orElseThrow());
    }

    @PatchMapping
    public MeResponseDTO update(@Valid @RequestBody MeUpdateRequest body,
                                @AuthenticationPrincipal User user) {

        var u = userRepo.findById(user.getId()).orElseThrow();
        u.setName(body.getName());
        userRepo.save(u);
        return MeResponseDTO.of(u);
    }

    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ChangePasswordRequest body,
                                               @AuthenticationPrincipal User user) {
        
        var u = userRepo.findById(user.getId()).orElseThrow();
        if(!encoder.matches(body.getCurrentPassword(), u.getPassword())) {
            return ResponseEntity.status(400).build();
        }
        u.setPassword(encoder.encode(body.getNewPassword()));
        userRepo.save(u);
        return ResponseEntity.noContent().build();
    }
}
