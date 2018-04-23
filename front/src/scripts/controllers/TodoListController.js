const Events = require('../constants/ConstatntManager');
const EventManager = require('../utils/EventManager');
const TodoItemModel = require('../models/TodoItemModelN');
const TemplateCreator = require('../utils/TemplateCreator');



function TodoListController(root) {

  // this._root = root.querySelector;
  this._input = root.querySelector('.todos-input_input-text');
  this._selectAllButton = root.querySelector('.todos-input_select-all');
  this._input.addEventListener('keypress', this);
  this._selectAllButton.addEventListener('click', this);
}

TodoListController.prototype = Object.create(EventManager.prototype);
TodoListController.prototype.constructor = TodoListController;

TodoListController.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'click':
      if (e.target === this._selectAllButton) {
        this.trigger(Events.SELECT_ALL);
      }
      break;
    case 'keypress':
      if (e.keyCode === 13) {
        if (this._input.value !== '') {
          this.trigger(Events.ADDED, {_text: this._input.value.trim()});
        }
        this._input.value = '';
      }
  }
};

module.exports = TodoListController;