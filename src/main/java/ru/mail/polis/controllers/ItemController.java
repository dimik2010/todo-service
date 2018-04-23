package ru.mail.polis.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.mail.polis.entities.Content;
import ru.mail.polis.entities.IsDoneMark;
import ru.mail.polis.entities.Item;
import ru.mail.polis.entities.User;
import ru.mail.polis.services.ItemListService;
import ru.mail.polis.services.UserService;

import java.security.Principal;
import java.util.List;

@Controller
public class ItemController {

  private final ItemListService itemListService;
  private final UserService userService;

  @Autowired
  public ItemController(ItemListService itemListService, UserService userService) {
    this.itemListService = itemListService;
    this.userService = userService;
  }

  @GetMapping("/")
  public ModelAndView redirect(Principal principal) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (!(auth instanceof AnonymousAuthenticationToken)) {
      /* The user is logged in :) */
      return new ModelAndView("forward:/items");
    } else {
      return new ModelAndView("forward:/login");
    }
  }



  @GetMapping("/items/list")
  @ResponseBody
  public List<Item> getItemsList(Principal principal) {
    return itemListService.getTodoByUserName(principal.getName());
  }

  @PatchMapping("/items/{id}/changestate")
  @ResponseBody
  public void changeItemState(@PathVariable("id") Integer id, @RequestBody IsDoneMark doneMark, Principal principal) {
    itemListService.setItemStateById(id, doneMark.isDone());

  }

  @PostMapping(value = "/items/add")
  @ResponseBody
  public ResponseEntity<Item> addItem(@RequestBody Item item, Principal principal) {
    item.setUser(userService.findByUsername(principal.getName()));
    return ResponseEntity.ok(itemListService.addItem(item));

  }

  @PatchMapping("/items/{id}/setcontent")
  @ResponseBody
  public void changeItemContent(@PathVariable("id") Integer id, @RequestBody Content content, Principal principal) {
    itemListService.updateContentById(id, content.getContent());
  }

  @PatchMapping("/items/changeall")
  @ResponseBody
  public void changeAllState(Principal principal) {
    User user = userService.findByUsername(principal.getName());
    if (user.getUsername().equals(principal.getName())) {
      itemListService.makeAllDone(userService.findByUsername(principal.getName()));
    }
  }

  @DeleteMapping("/items/{id}")
  @ResponseBody
  public void deleteItem(@PathVariable("id") Integer id, Principal principal) {
    itemListService.deleteById(id);
  }

}
