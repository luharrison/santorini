class Grid {

    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.grid = this.build(w, h);
    }

    build(w, h) {
        for (var i = 0, r = 0, c = 0, ng = [], nc; i < (w * h); i++, c++) {
            if (c >= w) {
                c = 0;
                r++;
            }
            if (c == 0) ng.push(new Array());
            nc = new GridCell(r, c, 0);
            //nc = { id: i, row: r, col: c, status: 0 }
            ng[r].push(nc);
        }
        return ng;
    }

    getCell(r, c) {
        

        if (this.inRange(r,c)) {
            return this.grid[r][c];
        } else {
            return null;
        }
    }

    getCellById(id) {
        var s = id.split('_');
        var r = Number(s[0].substring(1));
        var c = Number(s[1].substring(1));
        return this.getCell(r,c);
    }

    getCellStatus(r, c) {
        if (!this.inRange(r, c)) return -1;
        var c = getCell(r, c);
        return c.status;
    }

    setCellStatus(r, c, s) {
        this.grid[r][c].status = s;
    }

    getSurrounding(tr, tc) {
        var mxr = this.height - 1;

        tr = Number(tr);
        tc = Number(tc);

        var w = this.width;
        var h = this.height;
        var r1 = tr - 1 >= 0 ? tr - 1 : 0;
        var r2 = (tr + 1) < h ? tr + 1 : h-1;

        var c1 = tc - 1 >= 0 ? tc - 1 : 0;
        var c2 = tc + 1 < w ? tc + 1 : w-1;

        var cells = new Array();
        for (var i = 0, cell, r = r1, c = c1; i < 9; i++, c++) {
            if (c > c2) {
                c = c1;
                r++;
                if (r > r2) break;
            }

            var sameRow = r == tr;
            var sameCol = c == tc;

            if (sameRow && sameCol && r < r2 && c < c2) {} else {
                cell = this.getCell(r, c);
                if (cell) cells.push(cell);
            }

        }

        console.log(cells);
        return cells;
    }

    inRange(r, c) {
        var vr = r >= 0 && r < this.height;
        var vc = c >= 0 && c < this.width;
        return (vr && vc);
    }

    log() {
        console.log('logging ' + this.height);
        for (var i = 0, r = 0, o = ''; i < this.height; i++, r++, o = '') {
            for (var cell, c = 0; c < this.width; c++) {
                cell = this.getCell(r, c);
                o = o.concat(cell.status + ' ');
            }

            console.log('[ ' + o + ']');
        }
    }

    render() {
        console.log('render grid');
        var d = document.createElement('div');
        var t ;
        for (var i=0,r=0,c=0,cell; i<this.width*this.height; i++, c++) {
            if (c == this.width) {
                r++;
                c=0;
            }
            if (c == 0) {
                t = document.createElement('div');
                t.classList.add('row');
                d.appendChild(t);
            }

            cell = this.getCell(r,c);
            t.appendChild(cell.render());
        }


        return d;
    }
}

/*
//demo
var gameGrid = new Grid(3, 3);
gameGrid.setCellStatus(1, 1, 2);
gameGrid.log();

document.getElementById('grid').appendChild(gameGrid.render());

document.getElementById('grid').onclick = function(e) {
  
  var cell = gameGrid.getCellById(e.target.id);
  gameGrid.setCellStatus(cell.row, cell.col, cell.status+1);
  
  e.target.innerHTML = cell.status;

  console.log(gameGrid.getSurrounding(cell.row,cell.col));
}
*/