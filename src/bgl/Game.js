function Game() {
    this.init();
}



Game.prototype.display;
Game.prototype.language = 'en';
Game.prototype.round = {};
Game.prototype.players = {};
Game.prototype.items = {};
Game.prototype.settings = {};
Game.prototype.board = {
    grid: []
};

Game.prototype.grid = [];


Game.prototype.turnPhase = 1;
Game.prototype.playerActive = 1;

Game.prototype.init = function () {

    this.display = new DisplayManager();
}

Game.prototype.reset = function () {

}

Game.prototype.playerBuild = function(id) {
    return {
        'id': id,
        active: false
    }
}

Game.prototype.playerAddMeeple = function(id, meeple) {
    
}

Game.prototype.createGrid = function (w, h) {
    this.grid = new Grid(w, h);
}

Game.prototype.getPlayer = function(id) {
    if (id < players.length) return this.players[id];
    var dp = this.playerBuild(0);
    dp.valid = false;
    return dp;
}

Game.prototype.setPlayer = function (id) {
    this.playerActive = id;
}
Game.prototype.nextPlayer = function (id) {
    this.playerActive++;

    //temp
    if (this.playerActive > 2) this.playerActive = 1;

    return;

    //if (this.playerActive > this.players.length)
}