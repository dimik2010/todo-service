const TemplateCreator = require('../utils/TemplateCreator');
const EventManager = require('../utils/EventManager');
const Events = require('../constants/ConstatntManager');
const Filters = require('../constants/FilterManager');
const TodoItemView = require('../views/TodoItemView');


function TodoListView(model, root) {
  this._todoListModel = model;
  this._root = root;
  this._itemViews = [];
}

TodoListView.prototype = Object.create(EventManager.prototype);
TodoListView.prototype.constructor = TodoListView;

TodoListView.prototype._onAdd = function (model) {
  if (model.constructor === Array) {
    for (let i = 0; i < model.length; i++) {
      this._createNewItem(model[i], this._root);
    }
  } else {
    this._createNewItem(model, this._root);
  }

};

TodoListView.prototype._createNewItem = function (item, parent) {
  let itemVals = {
    text: item.getText(),
    isReady: item.isDone(),
  };
  let element = TemplateCreator.todoItem(itemVals);
  let itemView = new TodoItemView(element, item);
  this._itemViews.push(itemView);
  parent.appendChild(element.root);

};

TodoListView.prototype._onSelectAll = function () {
  for (let i = 0; i < this._root.children.length; i++) {
    this._root.children[i].classList.add('__done');
  }

};

// TodoListView.prototype._changeDoneMark = function (model) {
//   let index = this._itemViews.findIndex((element) => element._model.getId() === model.getId());
//
// }
//
TodoListView.prototype._onItemModelChange = function (item) {
  let changedItem = this._itemViews.find((element) => element._model.getId() === item.getId());
  changedItem.render();
};

TodoListView.prototype._onItemRemove = function (item) {
  let removingElementIndex = this._itemViews.findIndex((element) => element._model.getId() === item.getId());
  this._root.removeChild(this._itemViews[removingElementIndex].getRoot());
  this._itemViews.splice(removingElementIndex, 1);
};

TodoListView.prototype._onFilterChange = function (filterType) {
  switch (filterType) {
    case Filters.ALL:
      for (let i = 0; i < this._itemViews.length; i++) {
        this._itemViews[i].show();
      }
      break;
    case Filters.COMPLETED:
      for (let i = 0; i < this._itemViews.length; i++) {
        if (!this._itemViews[i].getModel().isDone()) {
          this._itemViews[i].hide();
        } else {
          this._itemViews[i].show();
        }
      }
      break;
    case Filters.UNDONE:
      for (let i = 0; i < this._itemViews.length; i++) {
        if (this._itemViews[i].getModel().isDone()) {
          this._itemViews[i].hide();
        } else {
          this._itemViews[i].show();
        }
      }
      break;
  }
};


TodoListView.prototype.setEventSubscribers = function () {
  this.on(Events.UPDATE_VIEW_ADD_NEW, this._onAdd, this);
  this.on(Events.UDATE_VIEW_SELECT_ALL, this._onSelectAll, this);
  this.on(Events.UPDATE_VIEW_STATUS_CHANGED, this._onItemModelChange, this);
  this.on(Events.UPDATE_VIEW_REMOVE, this._onItemRemove, this);
  this.on(Events.FILTER_CHANGED, this._onFilterChange, this);
};


module.exports = TodoListView;