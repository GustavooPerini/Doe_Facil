package com.projeto.doe_facil.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MeUpdateRequest {

    @NotBlank
    private String name;
}
