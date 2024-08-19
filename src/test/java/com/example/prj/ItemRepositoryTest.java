package com.example.prj;

import org.assertj.core.api.Assertions;
import com.example.prj.entity.Item;
import com.example.prj.repository.ItemRepository;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import org.springframework.test.annotation.Rollback;
import java.util.List;
import java.util.Optional;


@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ItemRepositoryTest {

    @Autowired
    private ItemRepository itemRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveItem() {
        Item item = new Item();
        item.setItemName("Nepali");
        item.setItemDescription("testing Description");
        item.setItemImage("Testing item image");
        item.setItemPerPrice(1200);
//        item.setCategory(1);
        item.setItemQuantity(10);
        itemRepository.save(item);
        Assertions.assertThat(item.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findById(){
        Item item = itemRepository.findById(1).get();
        Assertions.assertThat(item.getId()).isEqualTo(1);
    }

    @Test
    @Order(3)
    public void findAllData(){
        List<Item> itemList= itemRepository.findAll();
        Assertions.assertThat(itemList.size()).isGreaterThan(0);
    }


    @Test
    @Order(4)
    public void updateItem(){
        Item item=itemRepository.findById(1).get();
        item.setItemPerPrice(100);
        itemRepository.save(item);

        Assertions.assertThat(item.getItemPerPrice()).isEqualTo(100);
    }


    @Test
    @Order(5)
    public void deleteById(){
        itemRepository.deleteById(1);

        Item item1=null;

        Optional<Item> item=itemRepository.findById(1);
        if(item.isPresent()){
            item1=item.get();
        }
        Assertions.assertThat(item1).isNull();
    }
}