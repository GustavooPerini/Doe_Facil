package com.projeto.doe_facil.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.doe_facil.model.ItemModel;
import com.projeto.doe_facil.repository.ItemRepository;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public ItemModel save(ItemModel item) {
        return itemRepository.save(item);
    }

    public List<ItemModel> findAll() {
        return itemRepository.findAll();
    }

    public Optional<ItemModel> findById(Long id) {
        return itemRepository.findById(id);
    }

    public void delete(ItemModel item) {
        itemRepository.delete(item);
    }

}
