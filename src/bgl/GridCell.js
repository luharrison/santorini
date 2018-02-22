class GridCell {
    constructor(row, col, status) {
        this.id = this.id;
        this.row = row >= 0 ? row : 0;
        this.col = col >= 0 ? col : 0;
        this.status = status >= 0 ? status : 0;
    }

    set id(value) {
        //can't set id
    }
    get id() {
        return 'r' + this.row + '_c' + this.col;
    }

    set div(value) {

    }
    get div() {
        return document.querySelector("#r" + this.row + " #c" + this.col);
    }

    setStatus(s) {
        this.status = s;
    }

    render() {
        var d = document.createElement('div');
        d.setAttribute('id', this.id);
        d.setAttribute('data-row', this.row);
        d.setAttribute('data-col', this.col);
        d.setAttribute('class', 'cell');
        d.innerHTML = this.status;
        return d;
    }
}