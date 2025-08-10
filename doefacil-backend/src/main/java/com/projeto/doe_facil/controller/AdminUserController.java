package com.projeto.doe_facil.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.doe_facil.dto.UpdateUserRoleDTO;
import com.projeto.doe_facil.model.User;
import com.projeto.doe_facil.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {
  private final UserRepository userRepo;

  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public Page<User> list(@PageableDefault(size=20, sort="id") Pageable p) {
    return userRepo.findAll(p);
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public User get(@PathVariable Long id) {
    return userRepo.findById(id).orElseThrow();
  }

  @PatchMapping("/{id}/role")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> updateRole(@PathVariable Long id, @RequestBody @Valid UpdateUserRoleDTO dto) {
    var u = userRepo.findById(id).orElseThrow();
    u.setRole(dto.getRole());
    userRepo.save(u);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    var user = userRepo.findById(id).orElseThrow();
    userRepo.delete(user); // dispara cascades (itens, e dependências dos itens)
    return ResponseEntity.noContent().build();
  }
}
