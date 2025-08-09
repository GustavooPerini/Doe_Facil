package com.projeto.doe_facil.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class AuthResponse {
  private String token;
  private Long userId;
  private String name;
  private String role;
}
