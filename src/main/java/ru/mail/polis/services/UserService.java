package ru.mail.polis.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.mail.polis.entities.User;
import ru.mail.polis.repositories.UsersRepository;


@Service
public class UserService {
  private final UsersRepository userRep;
  private final BCryptPasswordEncoder encoder;

  public UserService(UsersRepository userRep, BCryptPasswordEncoder encoder) {
    this.userRep = userRep;
    this.encoder = encoder;
  }

  public User findByUsername (String username) {
    return userRep.findByUsername(username);
  }

  public void saveNewUser(User user) {
    user.setPassword(encoder.encode(user.getPassword()));
    userRep.save(user);
  }
}
