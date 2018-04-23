package ru.mail.polis.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Content {
  @JsonProperty("text")
  private String content;


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
