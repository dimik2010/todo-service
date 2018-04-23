package ru.mail.polis.entities;


import com.fasterxml.jackson.annotation.JsonProperty;

public class IsDoneMark {

  @JsonProperty(value = "_isDone")
  private boolean isDone;


  public boolean isDone() {
    return isDone;
  }

  public void setDone(boolean done) {
    isDone = done;
  }
}
