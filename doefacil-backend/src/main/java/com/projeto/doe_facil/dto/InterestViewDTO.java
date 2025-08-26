package com.projeto.doe_facil.dto;

import java.time.Instant;
import com.projeto.doe_facil.model.Interest;

public record InterestViewDTO(
  Long id,
  String message,
  Long interestedId,
  String interestedName,
  String interestedEmail,
  Instant createdAt,
  Interest.Status status
) {}