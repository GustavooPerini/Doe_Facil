package com.projeto.doe_facil.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.doe_facil.dto.InterestCreateDTO;
import com.projeto.doe_facil.dto.InterestViewDTO;
import com.projeto.doe_facil.model.User;
import com.projeto.doe_facil.service.InterestService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/interests")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class InterestController {
  private final InterestService service;

  @PostMapping
  public ResponseEntity<Long> create(@Valid @RequestBody InterestCreateDTO dto,
                                     @AuthenticationPrincipal User user) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto, user.getId()));
  }

  @PostMapping("/{id}/decision")
  public ResponseEntity<Void> decide(@PathVariable Long id,
                                     @RequestParam boolean accept,
                                     @AuthenticationPrincipal User owner) {
    service.decide(id, accept, owner.getId());
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/item/{itemId}")
  public ResponseEntity<List<InterestViewDTO>> listByItem(@PathVariable Long itemId,
                                                          @AuthenticationPrincipal User owner) {
    return ResponseEntity.ok(service.findByItemForOwner(itemId, owner.getId()));
  }
}
