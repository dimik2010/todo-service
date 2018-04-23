const TemplateCreator = require('../utils/TemplateCreator');
const EventManager = require('../utils/EventManager');
const Events = require('../constants/ConstatntManager');
const Requests = require('../utils/Requests');


function TodoItemView(element, model) {

  this._root = element.root;
  this._model = model;
  this._doneMark = element.doneMark;
  this._removeButton = element.remove;
  this._text = element.text;
  this._doneMark.addEventListener('click', this._onChangeState.bind(this));
  this._text.addEventListener('blur', this._onBlurText.bind(this));
  this._removeButton.addEventListener('click', this._onRemoveButtonClick.bind(this));
  this.render();
}


TodoItemView.prototype = Object.create(EventManager.prototype);
TodoItemView.prototype.constructor = TodoItemView;


TodoItemView.prototype._onBlurText = function (e) {
  console.log("inside blur text" + this._text.innerText);
  this._model.setText(this._text.innerText);
  Requests.changeText(this.getModel());

};

TodoItemView.prototype._onChangeState = function (e) {
  this.trigger(Events.CHANGED, this._model);
};

TodoItemView.prototype.getRoot = function () {
  return this._root;
};

TodoItemView.prototype.getModel = function () {
  return this._model;
};

TodoItemView.prototype._onRemoveButtonClick = function (e) {
  this.trigger(Events.REMOVED, this._model);
};

TodoItemView.prototype.hide = function () {
  if (!this._root.classList.contains('__hidden')) {
    this._root.classList.add('__hidden');
  }
};

TodoItemView.prototype.show = function () {
  if (this._root.classList.contains('__hidden')) {
    this._root.classList.remove('__hidden');
  }
};

TodoItemView.prototype.render = function () {
  if (this._model.isDone()) {
    this._root.classList.add('__done');
  } else {
    this._root.classList.remove('__done');
  }
};

module.exports = TodoItemView;



