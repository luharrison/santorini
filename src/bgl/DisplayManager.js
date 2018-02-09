function DisplayManager(t) {
  this.screens = [];
  this.currentScreenId = '';
  t = 'game';
  this.init();
}

DisplayManager.prototype.init = function () {
  this.screens = document.body.getElementsByClassName('screen');
  for (var i = 0; i < this.screens.length; i++) {
    this.hide(this.screens[i].id);
  }
}

DisplayManager.prototype.set = function (id) {
  if (id == '') return;
  this.hide(this.currentScreenId);
  this.currentScreenId = id;
  this.show(id);
}

DisplayManager.prototype.show = function (id) {
  if (id == '') return;
  var s = this.get(id);
  if (s) {
    s.style.display = 'block';
  }

  this.addListeners(id);
};

DisplayManager.prototype.addListeners = function (screenId) {
  var screen = document.querySelector('#'+screenId+'.screen');
  var buttons = screen.getElementsByClassName('btn');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function(e) {
      var ev = new Event('onButtonClick');
      ev.id = e.currentTarget.id;
      dispatchEvent(ev);
    }
  }
}

DisplayManager.prototype.removeListeners = function () {
  var screen = document.querySelector('#'+screenId+'.screen');
  var buttons = screen.getElementsByClassName('btn');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = null;
  }
}

DisplayManager.prototype.hide = function (id) {
  if (!id) this.hideAll();
  var s = this.get(id);
  if (s) s.style.display = 'none';
}

DisplayManager.prototype.hideAll = function () {
  for (var i = 0; i < this.screens.length; i++) {
    this.hide(this.screens[i].id);
  }
}

DisplayManager.prototype.get = function (id) {
  for (var i = 0; i < this.screens.length; i++) {
    if (this.screens[i].id == id) return this.screens[i];
  }
  return undefined;
}

DisplayManager.prototype.total = function () {
  return this.screens.length;
}