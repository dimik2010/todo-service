const Events = require('../constants/ConstatntManager');
const EventManager = require('../utils/EventManager');
const FilterTypes = require('../constants/FilterManager');

function FilterView(root) {
  this._filters = root.children;
  this._currentFilter = FilterTypes.ALL;
  this._filters[FilterTypes.ALL].addEventListener('click', this._checkAndTrigger.bind(this, FilterTypes.ALL));
  this._filters[FilterTypes.UNDONE].addEventListener('click', this._checkAndTrigger.bind(this, FilterTypes.UNDONE));
  this._filters[FilterTypes.COMPLETED].addEventListener('click', this._checkAndTrigger.bind(this, FilterTypes.COMPLETED));
}

FilterView.prototype = Object.create(EventManager.prototype);
FilterView.prototype.constructor = FilterView;

FilterView.prototype.setEventSubscribers = function () {
  this.on(Events.FILTER_CHANGED, this._onFilterChange, this);
};

FilterView.prototype._onFilterChange = function (filterType) {
  this._filters[this._currentFilter].classList.remove('__active');
  this._filters[filterType].classList.add('__active');
  this._currentFilter = filterType;
};



FilterView.prototype._checkAndTrigger = function (filter) {
  if (this._currentFilter !== filter) {
    this.trigger(Events.FILTER_CHANGED, filter);
  }
};

module.exports = FilterView;