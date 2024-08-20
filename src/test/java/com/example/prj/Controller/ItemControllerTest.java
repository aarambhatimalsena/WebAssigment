package com.example.prj.Controller;

import com.example.prj.entity.Item;
import com.example.prj.service.ItemService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class ItemControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ItemService itemService;

    @InjectMocks
    private ItemController itemController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(itemController).build();
    }

    @Test
    void testCreateItem() throws Exception {
        Item item = new Item();
        item.setId(1);
        item.setItemName("Test Item");
        item.setItemImage("image.png");
        item.setItemDescription("Description");
        item.setItemQuantity(10);
        item.setItemPerPrice(100);

        given(itemService.saveItem(item)).willReturn(item);

        mockMvc.perform(post("/api/items")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(item)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Item created successfully"));
    }

    @Test
    void testUpdateItem() throws Exception {
        Item item = new Item();
        item.setId(1);
        item.setItemName("Updated Item");

        given(itemService.updateItem(1, item)).willReturn(item);

        mockMvc.perform(put("/api/items/1")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(item)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Item updated successfully"));
    }

    @Test
    void testGetItemById() throws Exception {
        Item item = new Item();
        item.setId(1);
        item.setItemName("Test Item");

        given(itemService.getItemById(1)).willReturn(item);

        mockMvc.perform(get("/api/items/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Item found"));
    }

    @Test
    void testGetAllItems() throws Exception {
        List<Item> items = new ArrayList<>();
        items.add(new Item());
        items.add(new Item());

        given(itemService.getAllItems()).willReturn(items);

        mockMvc.perform(get("/api/items"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Items retrieved successfully"));
    }

    @Test
    void testDeleteItem() throws Exception {
        given(itemService.deleteItem(1)).willReturn(true);

        mockMvc.perform(delete("/api/items/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Item deleted successfully"));
    }
}
