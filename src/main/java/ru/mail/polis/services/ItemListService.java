package ru.mail.polis.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mail.polis.entities.Item;
import ru.mail.polis.entities.User;
import ru.mail.polis.repositories.ItemsRepository;
import ru.mail.polis.repositories.UsersRepository;

import java.util.List;


@Service
public class ItemListService {
  private final UsersRepository userRep;
  private final ItemsRepository itemsRep;

  @Autowired
  public ItemListService(UsersRepository userRep, ItemsRepository itemsRep) {
    this.userRep = userRep;
    this.itemsRep = itemsRep;
  }

  public List<Item> getTodoByUserId(Integer id) {
    return itemsRep.findByUser(userRep.findById(id).get());
  }

  public List<Item> getTodoByUserName(String name) {
    return itemsRep.findByUser(userRep.findByUsername(name));
  }

  public Item getItemByID(Integer id) {
    return itemsRep.findById(id).get();
  }

  public Item setItemStateById(Integer id, boolean state) {
    Item item = itemsRep.findById(id).get();
    item.setDone(state);
    return itemsRep.save(item);
  }

  public Item addItem(Item item) {
    return itemsRep.save(item);
  }

  public void updateContentById(Integer id, String text) {
    Item item = itemsRep.findById(id).get();
    item.setContent(text);
    itemsRep.save(item);
  }

  public void updateStatusById(Integer id, boolean isDone) {
    Item item = itemsRep.findById(id).get();
    item.setDone(isDone);
    itemsRep.save(item);
  }

  public void deleteById(Integer id) {
    itemsRep.deleteById(id);
  }

  public void makeAllDone(User user) {
    List<Item> items = itemsRep.findByUser(user);
    for (Item item : items) {
      item.setDone(true);
    }
    itemsRep.saveAll(items);

  }
}
