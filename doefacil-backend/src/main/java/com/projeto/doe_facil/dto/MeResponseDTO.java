package com.projeto.doe_facil.dto;

import com.projeto.doe_facil.model.User;
import com.projeto.doe_facil.model.User.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MeResponseDTO {

    private Long id;
    private String name;
    private String email;
    private Role role;

    public static MeResponseDTO of(User u) {
        return MeResponseDTO.builder()
            .id(u.getId())
            .name(u.getName())
            .email(u.getEmail())
            .role(u.getRole())
            .build();
    }
}
