package ru.mail.polis.repositories;

import ru.mail.polis.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, Integer> {
  User findByUsername(String username);
}
