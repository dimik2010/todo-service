
document.addEventListener('DOMContentLoaded', init);

const TodoListModel = require('./models/TodoListModelN');
const TodoListController = require('./controllers/TodoListController');
const TodoListView = require('./views/TodoListView');
const ActionBarController = require('./controllers/ActionBarController');
const FilterView = require('./views/FilterView');
const requests = require('./utils/Requests');


function init() {
  const globalWrapper = document.querySelector('.main-wrapper');
  const todoListController = new TodoListController(globalWrapper.querySelector('.todos-input'));
  const todoListModel = new TodoListModel();
  requests.getUserItems((items) => todoListModel.setItemsArray(items));
  const todoListView = new TodoListView(todoListModel,globalWrapper.querySelector('.todos-items-list'));
  const actionBarController = new ActionBarController(globalWrapper.querySelector('.todos-status-bar'), todoListModel);
  const filterView = new FilterView(globalWrapper.querySelector('.todos-status-bar').querySelector('.todos-status-bar_filters'));
  todoListModel.setEventSubscribers();
  todoListView.setEventSubscribers();
  actionBarController.setEventSubscribers();
  filterView.setEventSubscribers();

}