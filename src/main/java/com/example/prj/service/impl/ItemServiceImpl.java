package com.example.prj.service.impl;

import com.example.prj.entity.Item;
import com.example.prj.repository.ItemRepository;
import com.example.prj.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public Item updateItem(Integer id, Item item) {
        Optional<Item> existingItem = itemRepository.findById(id);
        if (existingItem.isPresent()) {
            item.setId(id);
            return itemRepository.save(item);
        }
        return null; // Handle item not found
    }

    @Override
    public Item getItemById(Integer id) {
        return itemRepository.findById(id).orElse(null); // Handle item not found
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public boolean deleteItem(Integer id) {
        if (itemRepository.existsById(id)) {
            itemRepository.deleteById(id);
            return true;
        }
        return false; // Handle item not found
    }
}
