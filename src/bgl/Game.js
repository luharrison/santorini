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

Game.prototype.gridBuild = function (tr, tc) {
    var newGrid = [];

    for (var i=0,r=0,c=0,nc; i<25; i++, c++) {
        if (c >= tc) {
            c=0; r++;
        }
        if (c == 0) {
            newGrid.push(new Array());
        }

        nc = {
            id: i,
            row: r,
            col: c,
            status: 0
        }

        newGrid[r].push(nc);
    }

    this.grid = newGrid;
}

Game.prototype.gridGetCell = function(r,c) {
    r = Number(r);
    c = Number(c);
    console.log('gridGetCell ' + r + ',' + c);
    if (r >= 0 && r < 5 && c >= 0 && c < 5) {
        return this.grid[r][c];
    } else {
        return {error:true};
    }
}

Game.prototype.gridSetCellStatus = function(r,c,s) {
    this.grid[r][c].status = s;
}

Game.prototype.gridGetSurrounding = function(tr,tc) {
    var mxr = 4;

    tr = Number(tr);
    tc = Number(tc);

    var r1 = tr-1 >= 0 ? tr-1 : 0;
    var r2 = tr+1 < 5 ? tr+1 : 4;

    console.log('r1 ' + r1 + ' r2 ' + r2);
    
    var c1 = tc-1 >= 0 ? tc-1 : 0;
    var c2 = tc+1 < 5 ? tc+1 : 4;

    console.log('c1 ' + c1 + ' c2 ' + c2);

    var cells = new Array();

    for (var i=0,cell,r=r1,c=c1; i<9; i++,c++) {
        if (c > c2) {
            c = c1;
            r++;
            if (r > r2) break;
        }

        console.log(r + ' ' + c + '  vs  ' + tr + ' ' +tc);
        var sameRow = r == tr;
        var sameCol = c == tc;

        if (sameRow && sameCol && r < 5 && c < 5) {
        } else {
            cell = game.gridGetCell(r,c);
            if (cell.error != true)
            cells.push(cell);
        }
        
    }
    
    return cells;
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