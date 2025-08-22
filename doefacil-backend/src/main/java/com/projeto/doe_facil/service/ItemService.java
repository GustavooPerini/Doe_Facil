package com.projeto.doe_facil.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.projeto.doe_facil.dto.ItemCreateDTO;
import com.projeto.doe_facil.dto.ItemResponseDTO;
import com.projeto.doe_facil.dto.PageResponse;
import com.projeto.doe_facil.dto.UserResponseDTO;
import com.projeto.doe_facil.model.Item;
import com.projeto.doe_facil.repository.CategoryRepository;
import com.projeto.doe_facil.repository.ItemRepository;
import com.projeto.doe_facil.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service @RequiredArgsConstructor
public class ItemService {
  private final ItemRepository itemRepo;
  private final UserRepository userRepo;
  private final CategoryRepository categoryRepo;

  @Transactional
  public ItemResponseDTO create(ItemCreateDTO dto, Long ownerId) {
    var owner = userRepo.findById(ownerId).orElseThrow();
    var category = categoryRepo.findById(dto.getCategoryId()).orElseThrow();
    var item = Item.builder()
        .title(dto.getTitle())
        .description(dto.getDescription())
        .category(category)
        .owner(owner)
        .city(dto.getCity())
        .state(dto.getState())
        .status(Item.Status.AVAILABLE)
        .build();
    item = itemRepo.save(item);
    return toResponse(item);
  }

  public PageResponse<ItemResponseDTO> listAvailable(Pageable pageable) {

    var item = itemRepo.findByStatus(Item.Status.AVAILABLE, pageable).map(this::toResponse);
    return PageResponse.of(item);
  }

  @Transactional
  public void changeStatus(Long itemId, Item.Status status, Long requesterId) {
    var item = itemRepo.findById(itemId).orElseThrow();
    //if (!item.getOwner().getId().equals(requesterId)) throw new AccessControlException("not owner");
    item.setStatus(status);
  }

  private ItemResponseDTO toResponse(Item i) {
    var r = new ItemResponseDTO();
    r.setId(i.getId());
    r.setTitle(i.getTitle());
    r.setDescription(i.getDescription());
    r.setCategory(i.getCategory().getName());
    r.setCity(i.getCity());
    r.setState(i.getState());
    r.setStatus(i.getStatus().name());
    r.setCreatedAt(i.getCreatedAt());
    r.setOwnerId(i.getOwner().getId());
    return r;
  }
}
