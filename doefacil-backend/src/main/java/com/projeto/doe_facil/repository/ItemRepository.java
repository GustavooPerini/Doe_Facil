package com.projeto.doe_facil.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.doe_facil.model.ItemModel;

public interface ItemRepository extends JpaRepository<ItemModel, Long>{
    
}
