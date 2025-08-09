package com.projeto.doe_facil.dto;

import com.projeto.doe_facil.model.User;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateUserRoleDTO {
  @NotNull
  private User.Role role; // USER ou ADMIN
}
