package com.projeto.doe_facil.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.doe_facil.dto.ItemCreateDTO;
import com.projeto.doe_facil.dto.ItemResponseDTO;
import com.projeto.doe_facil.model.Item;
import com.projeto.doe_facil.model.User;
import com.projeto.doe_facil.service.ItemService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") // simples por enquanto
public class ItemController {
  private final ItemService service;

  @PostMapping
  public ResponseEntity<ItemResponseDTO> create(@Valid @RequestBody ItemCreateDTO dto,
                                                @AuthenticationPrincipal User user) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto, user.getId()));
  }

  @GetMapping
  public Page<ItemResponseDTO> list(@PageableDefault(size = 12, sort = "createdAt", direction = Sort.Direction.DESC) Pageable p) {
    return service.listAvailable(p);
  }

  @PatchMapping("/{id}/status")
  public ResponseEntity<Void> changeStatus(@PathVariable Long id,
                                           @RequestParam Item.Status status,
                                           @AuthenticationPrincipal User user) {
    service.changeStatus(id, status, user.getId());
    return ResponseEntity.noContent().build();
  }
}
