package com.projeto.doe_facil.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class InterestCreateDTO {
  @NotNull private Long itemId;
  private String message;
}
