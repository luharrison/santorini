function GridCell(r,c) {
    this.init(r,c);
}

GridCell.prototype.id = 'r0_c0';
GridCell.prototype.row = 0;
GridCell.prototype.col = 0;
GridCell.prototype.status = 0;

GridCell.prototype.getId = function() {
    return 'r' + this.row + '_c' + this.c;
}

GridCell.prototype.render = function() {
    var id = this.getId();
    var r = this.row;
    var c = this.col;
    return '<div id="'+id+'" class="cell" data-row="'+r+'" data-col="'+c+'"></div>';
}

Game.prototype.init = function (r,c) {
    this.row = r;
    this.col = c;
}

Game.prototype.reset = function () {

}

Game.prototype.gridBuild = function (r, c) {
    var grid = [];

    for (var i=0; i<(r*c); i++, c++) {
        if (c >= c) {c=0; r++}
        
    }
}
