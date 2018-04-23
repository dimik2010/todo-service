const EventManager = require('../utils/EventManager');
const Events = require('../constants/ConstatntManager');

function TodoItemModel(data) {
  this._id = data._id || 0;
  this._isDone = data._isDone || false;
  this._text = data._text;
}

TodoItemModel.prototype = Object.create(EventManager.prototype);
TodoItemModel.prototype.constructor = TodoItemModel;

TodoItemModel.prototype.getId = function () {
  return this._id;
};

TodoItemModel.prototype.setId = function (id) {
  this._id = id;
};

TodoItemModel.prototype.isDone = function () {
  return this._isDone;

};

TodoItemModel.prototype.setText = function (text) {
  this._text = text;
};

TodoItemModel.prototype.setDone = function (value) {
  if (value) {
    this._isDone = true;
  } else {
    this._isDone = false;
  }
};

TodoItemModel.prototype.changeDone = function () {
  this._isDone = !this._isDone;
  return this._isDone;
};

TodoItemModel.prototype.getText = function () {
  return this._text;
};

TodoItemModel.prototype.setEventSubscribers = function () {

};

module.exports = TodoItemModel;
