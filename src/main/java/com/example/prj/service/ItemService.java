package com.example.prj.service;

import com.example.prj.entity.Item;

import java.util.List;

public interface ItemService {
    Item saveItem(Item item);
    Item updateItem(Integer id, Item item);
    Item getItemById(Integer id);
    List<Item> getAllItems();
    boolean deleteItem(Integer id);
}
