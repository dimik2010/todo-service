const Events = require('../constants/ConstatntManager');
const EventManager = require('../utils/EventManager');


function ActionBarController(root, listModel) {
  this._listModel = listModel;
  this._deleteCompletedButton = root.querySelector('.todos-status-bar_delete-completed');
  this._undoneCounterText = root.querySelector('.todos-status-bar_counter');
  this._deleteCompletedButton.addEventListener('click', this._onDeleteCompletedClick.bind(this));

}

ActionBarController.prototype = Object.create(EventManager.prototype);
ActionBarController.prototype.constructor = ActionBarController;

ActionBarController.prototype._onDeleteCompletedClick = function (e) {
  this.trigger(Events.DELETE_COMPLETED);
};

ActionBarController.prototype._onAnyChange = function () {
  this._undoneCounterText.innerText = this._listModel.getItemsUndone() + ' tasks to do';
};

ActionBarController.prototype.setEventSubscribers = function () {
  this.on(Events.ADDED, this._onAnyChange, this);
  this.on(Events.CHANGED, this._onAnyChange, this);
  this.on(Events.SELECT_ALL, this._onAnyChange, this);
  this.on(Events.REMOVED, this._onAnyChange, this);

};



module.exports = ActionBarController;