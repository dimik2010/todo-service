package ru.mail.polis.repositories;

import org.hibernate.annotations.SQLUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.mail.polis.entities.Item;
import ru.mail.polis.entities.User;

import java.util.List;

public interface ItemsRepository extends JpaRepository<Item, Integer> {
  List<Item> findByUser(User user);

}
