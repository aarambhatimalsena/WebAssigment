package com.example.prj.Controller;

import com.example.prj.entity.Item;
import com.example.prj.service.ItemService;
import com.example.prj.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity<ApiResponse<Item>> createItem(@RequestBody Item item) {
        Item createdItem = itemService.saveItem(item);
        ApiResponse<Item> response = new ApiResponse<>(true, "Item created successfully", createdItem);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Item>> updateItem(@PathVariable Integer id, @RequestBody Item item) {
        Item updatedItem = itemService.updateItem(id, item);
        if (updatedItem != null) {
            ApiResponse<Item> response = new ApiResponse<>(true, "Item updated successfully", updatedItem);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ApiResponse<Item> response = new ApiResponse<>(false, "Item not found", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Item>> getItemById(@PathVariable Integer id) {
        Item item = itemService.getItemById(id);
        if (item != null) {
            ApiResponse<Item> response = new ApiResponse<>(true, "Item found", item);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ApiResponse<Item> response = new ApiResponse<>(false, "Item not found", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Item>>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        ApiResponse<List<Item>> response = new ApiResponse<>(true, "Items retrieved successfully", items);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteItem(@PathVariable Integer id) {
        if (itemService.deleteItem(id)) {
            ApiResponse<Void> response = new ApiResponse<>(true, "Item deleted successfully", null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ApiResponse<Void> response = new ApiResponse<>(false, "Item not found", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}
