function Game() {
    this.init();
}



Game.prototype.display;
Game.prototype.language = 'en';
Game.prototype.round = {};
Game.prototype.players = {};
Game.prototype.items = {};
Game.prototype.settings = {};

Game.prototype.init = function () {

    this.display = new DisplayManager();
}

Game.prototype.reset = function () {

}
