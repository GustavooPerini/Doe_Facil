package com.projeto.doe_facil.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.projeto.doe_facil.dto.InterestCreateDTO;
import com.projeto.doe_facil.dto.InterestViewDTO;
import com.projeto.doe_facil.model.Interest;
import com.projeto.doe_facil.model.Item;
import com.projeto.doe_facil.repository.InterestRepository;
import com.projeto.doe_facil.repository.ItemRepository;
import com.projeto.doe_facil.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service @RequiredArgsConstructor
public class InterestService {
  private final InterestRepository interestRepo;
  private final ItemRepository itemRepo;
  private final UserRepository userRepo;


  @Transactional
  public Long create(InterestCreateDTO dto, Long interestId) {
    if (interestRepo.existsByItemIdAndInterestedId(dto.getItemId(), interestId))
      throw new IllegalStateException("Interest already exists");

    var item = itemRepo.findById(dto.getItemId()).orElseThrow();
    if (item.getStatus() != Item.Status.AVAILABLE) throw new IllegalStateException("Item not available");
    if (item.getOwner().getId().equals(interestId)) throw new IllegalStateException("Owner cannot create interest");

    var user = userRepo.findById(interestId).orElseThrow();

    var interest = Interest.builder()
        .item(item)
        .interested(user)
        .message(dto.getMessage())
        .status(Interest.Status.PENDING)
        .build();

    return interestRepo.save(interest).getId();
  }

  @Transactional
  public void decide(Long interestId, boolean accept, Long ownerId) {
    var interest = interestRepo.findById(interestId).orElseThrow();
    var item = interest.getItem();
    //if (!item.getOwner().getId().equals(ownerId)) throw new AccessControlException("not owner");

    interest.setStatus(accept ? Interest.Status.ACCEPTED : Interest.Status.REJECTED);
    if (accept) item.setStatus(Item.Status.RESERVED);
  }

  public List<InterestViewDTO> findByItemForOwner(Long itemId, Long ownerId) {
    Item item = itemRepo.findById(itemId)
      .orElseThrow(() -> new IllegalArgumentException("Item não encontrado"));

    if (!item.getOwner().getId().equals(ownerId)) {
      throw new AccessDeniedException("Acesso negado");
    }

    List<Interest> list = interestRepo.findByItemIdOrderByCreatedAtDesc(itemId);
    return list.stream().map(i ->
      new InterestViewDTO(
        i.getId(),
        i.getMessage(),
        i.getInterested().getId(),
        i.getInterested().getName(),
        i.getInterested().getEmail(),
        i.getCreatedAt(),
        i.getStatus()
      )
    ).collect(Collectors.toList());
  }
}
