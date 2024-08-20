package com.example.prj.steps;

import com.example.prj.entity.Item;
import com.example.prj.service.ItemService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ItemSteps {

    @Autowired
    private ItemService itemService;

    private MockMvc mockMvc;
    private ResponseEntity<String> response;
    private Item item;

    @Given("I have a new item with name {string}")
    public void i_have_a_new_item_with_name(String name) {
        item = new Item();
        item.setItemName(name);
        item.setItemImage("image.png");
        item.setItemDescription("Description");
        item.setItemQuantity(10);
        item.setItemPerPrice(100);
    }

    @When("I create the item")
    public void i_create_the_item() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/items")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(item)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Item created successfully"));
    }

    @Then("the item should be created successfully")
    public void the_item_should_be_created_successfully() {
        // Implement further validation if needed
    }

    @Given("I have an existing item with ID {int}")
    public void i_have_an_existing_item_with_id(Integer id) {
        // Assuming item is added to the service or repository in setup
    }

    @When("I update the item with new name {string}")
    public void i_update_the_item_with_new_name(String newName) throws Exception {
        item.setItemName(newName);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/items/1")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(item)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Item updated successfully"));
    }

    @Then("the item should be updated successfully")
    public void the_item_should_be_updated_successfully() {
        // Implement further validation if needed
    }

    @When("I request the item by ID")
    public void i_request_the_item_by_id() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/items/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Item found"));
    }

    @Then("the item should be returned")
    public void the_item_should_be_returned() {
        // Implement further validation if needed
    }

    @When("I request all items")
    public void i_request_all_items() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/items"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Items retrieved successfully"));
    }

    @Then("all items should be retrieved successfully")
    public void all_items_should_be_retrieved_successfully() {
        // Implement further validation if needed
    }

    @When("I delete the item")
    public void i_delete_the_item() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/items/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Item deleted successfully"));
    }

    @Then("the item should be deleted successfully")
    public void the_item_should_be_deleted_successfully() {
        // Implement further validation if needed
    }
}
