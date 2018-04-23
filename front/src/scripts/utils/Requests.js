function Requests() {
  this.mainPath = '/items';
  this.contentType = 'Content-Type';
  this.headerType = 'application/json';
  this.errorMessage = 'Error. Try again';
}



Requests.prototype.addItem = function (model, handler) {
  let reqBody = {
    _text: model.getText(),
    _isDone: model.isDone(),
  };

  let req = new XMLHttpRequest();
  req.open('POST', this.mainPath + '/add', true);
  req.setRequestHeader(this.contentType, this.headerType);
  req.send(JSON.stringify(reqBody));
  req.onload = function () {
    if (req.status === 200) {
      let respBody = JSON.parse(req.response);
      handler(respBody);
    } else {
      alert(this.errorMessage);
    }
  }
};

Requests.prototype.deleteItem = function (itemId) {
  let req = new XMLHttpRequest();
  req.open('DELETE', this.mainPath + '/' + itemId);
  req.send();
};

Requests.prototype.getUserItems = function (handler) {
  let req = new XMLHttpRequest();
  req.open('GET', this.mainPath + '/list', true);
  req.send();
  req.onload = function () {
    if (req.status === 200) {
      let respBody = JSON.parse(req.response);
      console.log(respBody);
      handler(respBody);
    } else {
      alert(this.errorMessage);
    }
  }
};

Requests.prototype.changeState = function(item) {
  let reqBody = {
    _isDone: item.isDone(),
  };

  let req = new XMLHttpRequest();
  req.open('PATCH', this.mainPath + '/' + item.getId() + '/changestate');
  req.setRequestHeader(this.contentType, this.headerType);
  req.send(JSON.stringify(reqBody));
  req.onload = function () {
    if (req.status !== 200) {
      alert(this.errorMessage);
    }
  }
};

Requests.prototype.changeText = function(item) {
  let reqBody = {
    text: item.getText(),
  };
  let req = new XMLHttpRequest();
  req.open('PATCH', this.mainPath + '/' + item.getId() + '/setcontent');
  req.setRequestHeader(this.contentType, this.headerType);
  req.send(JSON.stringify(reqBody));
  req.onload = function () {
    if (req.status !== 200) {
      alert(this.errorMessage);
    }
  }
};

Requests.prototype.changeAllToDone = function() {
  let req = new XMLHttpRequest();
  req.open('PATCH', this.mainPath + '/changeall');
  req.send();
  req.onload = function () {
    if (req.status !== 200) {
      alert(this.errorMessage);
    }
  }
};


requests = new Requests();

module.exports = requests;