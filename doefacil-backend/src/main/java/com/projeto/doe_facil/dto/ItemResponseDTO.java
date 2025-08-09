package com.projeto.doe_facil.dto;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ItemResponseDTO {
  private Long id;
  private String title;
  private String description;
  private String category;
  private String city;
  private String state;
  private String status;
  private Instant createdAt;
  private Long ownerId;
}