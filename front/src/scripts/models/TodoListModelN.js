const EventManager = require('../utils/EventManager');
const Events = require('../constants/ConstatntManager');
const TodoItemModel = require('../models/TodoItemModelN');
const Requests = require('../utils/Requests');

function TodoListModel(items) {
  this._items = items || [];
  this._itemsUndone = 0;

}


TodoListModel.prototype = Object.create(EventManager.prototype);
TodoListModel.prototype.constructor = TodoListModel;

TodoListModel.prototype.setItemsArray = function (items) {
  for (let i = 0; i < items.length; i++) {
    this.add.call(this, items[i], true);
  }
};

TodoListModel.prototype.getItems = function () {
  return this._items;
};

TodoListModel.prototype.getItemsUndone = function () {
  return this._itemsUndone;
};

TodoListModel.prototype.updateItemsUndone = function() {
  for (let i = 0; i < this._items.length; i++) {
    if (!this._items[i].isDone()) {
      this._itemsUndone++;
    }
  }
};

TodoListModel.prototype.add = function (item, needRequest) {
  let newItem = new TodoItemModel(item);

  if(needRequest === undefined) {
    Requests.addItem(newItem, function (resp) {
      newItem.setId(resp['_id']);
    });
  }
  this._items.push(newItem);
  this._itemsUndone++;
  this.trigger(Events.UPDATE_VIEW_ADD_NEW, newItem);
};

TodoListModel.prototype.delete = function (item) {
  let removingItemPosition = this._items.findIndex((arrayItem) => arrayItem.getId() === item.getId());
  console.log(item.getId());
  Requests.deleteItem(item.getId());
  this.trigger(Events.UPDATE_VIEW_REMOVE, this._items[removingItemPosition]);
  if (!this._items[removingItemPosition].isDone()) {
    this._itemsUndone--;
  }
  this._items.splice(removingItemPosition, 1);
};

TodoListModel.prototype._onSelectAll = function () {
  for (let i = 0; i < this._items.length; i++) {
    this.setDone(this._items[i], true);
  }
  this._itemsUndone = 0;
  Requests.changeAllToDone();

  this.trigger(Events.UDATE_VIEW_SELECT_ALL);
};

TodoListModel.prototype.setDone = function (element, value) {
  element.setDone(value);
};

TodoListModel.prototype._onItemChange = function(model) {
  let index = this._items.findIndex((element) => element.getId() === model.getId());
  if (this._items[index].changeDone()) {
    this._itemsUndone--;
  } else {
    this._itemsUndone++;
  }
  Requests.changeState(this._items[index]);
  this.trigger(Events.UPDATE_VIEW_STATUS_CHANGED, this._items[index]);
};

TodoListModel.prototype._onDeleteCompleted = function() {
  let i = 0;
  while (i < this._items.length) {
    if (this._items[i].isDone()) {
      this.trigger(Events.UPDATE_VIEW_REMOVE, this._items[i]);
      Requests.deleteItem(this._items[i].getId());
      this._items.splice(i, 1);
    } else {
      i++;
    }
  }
};


TodoListModel.prototype.setEventSubscribers = function () {
  this.on(Events.ADDED, this.add, this); //TODO: check if call `this.add` works!
  this.on(Events.REMOVED, this.delete, this);
  this.on(Events.SELECT_ALL, this._onSelectAll, this);
  this.on(Events.CHANGED, this._onItemChange, this);
  this.on(Events.DELETE_COMPLETED, this._onDeleteCompleted, this);
};

module.exports = TodoListModel;
