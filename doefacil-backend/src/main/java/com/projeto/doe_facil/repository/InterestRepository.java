package com.projeto.doe_facil.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.doe_facil.model.Interest;

public interface InterestRepository extends JpaRepository<Interest, Long> {
  boolean existsByItemIdAndInterestedId(Long itemId, Long userId);
  List<Interest> findByItemId(Long itemId);
  List<Interest> findByItemIdOrderByCreatedAtDesc(Long itemId);
}