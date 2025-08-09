package com.projeto.doe_facil.service;

import org.springframework.stereotype.Service;

import com.projeto.doe_facil.dto.InterestCreateDTO;
import com.projeto.doe_facil.model.Interest;
import com.projeto.doe_facil.model.Item;
import com.projeto.doe_facil.repository.InterestRepository;
import com.projeto.doe_facil.repository.ItemRepository;
import com.projeto.doe_facil.repository.UserRepository;

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
}
