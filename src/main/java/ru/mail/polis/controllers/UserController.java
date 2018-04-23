package ru.mail.polis.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import ru.mail.polis.entities.User;
import ru.mail.polis.services.UserService;

import javax.validation.Valid;

@Controller
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/signup")
  private ModelAndView signup() {
    ModelAndView modelAndView = new ModelAndView();
    User user = new User();
    modelAndView.addObject("user", user);
    modelAndView.setViewName("signup");
    return modelAndView;
  }

  @PostMapping("/signup")
  private ModelAndView signup(@Valid User user, BindingResult bindingResult) {
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.setViewName("signup");
    if (userService.findByUsername(user.getUsername()) != null) {
      bindingResult.rejectValue("username", "error.user", "User already exist");
    }
    if (!bindingResult.hasErrors()) {
      userService.saveNewUser(user);
      modelAndView.addObject("successMessage", "Success! Now you can log in into your account");
      modelAndView.addObject("user", new User());
    }
    return modelAndView;
  }

}
