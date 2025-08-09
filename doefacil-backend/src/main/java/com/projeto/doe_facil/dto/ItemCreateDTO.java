package com.projeto.doe_facil.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ItemCreateDTO {
  @NotBlank private String title;
  private String description;
  @NotNull private Long categoryId;
  @NotBlank private String city;
  @NotBlank private String state;
}
