function EventManger() {
    this.eventListeners = {};
}

var eventManager = new EventManger();

EventManger.prototype.on = function (event, handler, context) {
    if (event in eventManager.eventListeners) {
        eventManager.eventListeners[event].push({handler: handler, context: context});
    } else {
        eventManager.eventListeners[event] = [];
        eventManager.eventListeners[event].push({handler: handler, context: context});
    }
    return eventManager;
};

EventManger.prototype.off = function (event, handler, context) {
    eventManager.eventListeners[event] = evenManager.eventListeners[event].filter(function (value) {
        return value.handler !== handler && value.context !== context;
    });
    return eventManager;
};
EventManger.prototype.trigger = function (event, data) {
    if (eventManager.eventListeners[event] !== undefined) {
        let subscribersCopy = eventManager.eventListeners[event].slice();
        for (let i = 0; i < subscribersCopy.length; i++) {
            subscribersCopy[i].handler.call(subscribersCopy[i].context, data);
        }
    }
    return eventManager;
};

module.exports = EventManger;