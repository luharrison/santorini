/* todo 
don't move on meeples
don't move or build on blocks
highlighting is off when items removed
*/

var game;
var SCREEN_TITLE = 'title';
var SCREEN_LOBBY = 'lobby';
var SCREEN_GAME  = 'game';

var GRID_WIDTH = 5;
var GRID_HEIGHT = 5;

var CELL_STATUS_LV0 = 0;
var CELL_STATUS_LV1 = 1;
var CELL_STATUS_LV2 = 2;
var CELL_STATUS_LV3 = 3;
var CELL_STATUS_BLOCK = 4;

var PHASE_MEEPLE = 0;
var PHASE_MOVE = 1;
var PHASE_BUILD = 2;
var PHASE_CONFIRM = 3;

var PHASE_TIP_MEEPLE = 'Select your meeple!';
var PHASE_TIP_MOVE = 'Select and Move your meeple!';
var PHASE_TIP_BUILD = 'Build or Finish a tower!';
var PHASE_TIP_CONFIRM = 'Confirm this move?';
var phaseTips = [PHASE_TIP_MEEPLE,PHASE_TIP_MOVE,PHASE_TIP_BUILD,PHASE_TIP_CONFIRM];

window.onload = function() {
    game = new Game();  
    game.display.set(SCREEN_GAME);
    game.createGrid(5,5);
    resetBoard();

    // build 3d buttons
    var btns = ['action','cancel','select'];
    for (var i=0,btn,ico; i<btns.length; i++) {
       btn = createButton3D(120, 80, 20, 'game_'+btns[i], i==0 ? 'hori' : 'vert');
       if (i==0) {
           //make it horizontal
       }
    }

    setPhase(PHASE_MOVE);
};

//TODO
//addEventListener('onScreenShow', function(e) {});
//addEventListener('onScreenHide', function(e) {});

addEventListener('onButtonClick', function(e) {
    if (e.id == 'new') {
        game.display.set(SCREEN_LOBBY);
    }

    if (e.id == 'resume') {
        game.display.set(SCREEN_GAME);
        resetBoard();
    }

    if (e.id == 'lobby_back') {
        game.display.set(SCREEN_TITLE);
    }

    if (e.id == 'lobby_join') {

        //check lobby room 

            //is it empty
                // make new game
                // ask for password (p1 has a pw and p2 has one)

                //start a new lobby and give password
                //password should be given to other player and they can join

        //SHOW THE JOINING LOBBY
        //SHOW THE WAITING FOR LOBBY
    }

    if (e.id == 'lobby_room_0') {
        onLobbySelectRoom(0);
    }

    if (e.id == 'lobby_room_1') {
        onLobbySelectRoom(1);
    }

    if (e.id == 'lobby_room_2') {
        onLobbySelectRoom(2);
    }

    if (e.id == 'game_cancel') {

        switch (game.turnPhase) {

            case PHASE_MEEPLE: 
            case PHASE_MOVE: 
            toggleMeeple();
            setPhase(PHASE_MOVE);
            document.querySelector('#game_cancel .box').classList.toggle('flip');
            break;
            
            case PHASE_BUILD: 
            moveMeeple(mor,moc);
            setPhase(PHASE_MOVE);
            break;


            case PHASE_CONFIRM: 
            
            var ac = avaliableMoves[activeMoveCell]; 
            var r = ac.row;
            var c = ac.col;      
            var cell = game.grid.getCell(r,c);
            var cs = cell.status;
            var ncs = cs-1 >= 0 ? cs-1 : 0;
            
            cell = cell.setStatus(ncs);

            cell = getDivCell(r,c);
            cell.innerHTML = getTower(ncs);
            
            setPhase(PHASE_BUILD);
            break;
        }
    }

    if (e.id == 'game_select') {
        switch (game.turnPhase) {
            case PHASE_MEEPLE:  toggleMeeple();         break; //pick
            case PHASE_MOVE:    toggleCellActive();     break; //move
            case PHASE_BUILD:   toggleCellActive();     break; //build
        }
    }

    var cell;
    if (e.id == 'game_action') {
        switch (game.turnPhase) {
            case PHASE_MEEPLE: setPhase(PHASE_MOVE);     break;
            case PHASE_MOVE: 
                    cell = avaliableMoves[activeMoveCell];
                    moveMeeple(cell.row, cell.col);
                    setPhase(PHASE_BUILD);   break;
            case PHASE_BUILD: 
                    cell = avaliableMoves[activeMoveCell];
                    buildCell(cell.row, cell.col);
                    
                    //setPhase(PHASE_CONFIRM);  
                    endTurn();
                    
                    break;
            case PHASE_CONFIRM: endTurn(); break;
        }
    }

});

function onLobbySelectRoom(id) {

    var roomTiles = document.getElementsByClassName('room');
    for (var i=0; i<roomTiles.length; i++) {
        roomTiles[i].classList.remove('selected');
    };

    document.getElementById('lobby_room_' + id).classList.add('selected');

    //unselect all the room buttons
    //toggle the selected state of this room button
    //update the room info

    //what is the room status
        //empty , show the start game button
        //active, show the join game button
}

function test(t,e) {
    //onCellClick
    
    var target = t.target;

    if (target.classList.contains('cell')) {
        var c = target.id;
        var r = target.parentNode.id;
        console.log(t);
    } else {
        return;
    }

    r = Number(r.substring(1));
    c = Number(c.substring(1));
    moveMeeple(r,c);
}

function test2(t,e) {
    var target = t.target;

    if (target.classList.contains('player')) {
        var p = Number(target.id.substring(1));
        game.setPlayer(p);

        var ps = document.getElementsByClassName('player');
        for (var i=0; i<ps.length; i++) {
            ps[i].classList.remove('active');
        }

        target.classList.add('active');

    } else {
        return;
    }
}

function resetBoard() {
    moveMeeple(1,1, getMeeple(1,1));
    moveMeeple(1,3, getMeeple(1,2));
    moveMeeple(3,1, getMeeple(2,1));
    moveMeeple(3,3, getMeeple(2,2)); 

    game.createGrid(GRID_WIDTH, GRID_HEIGHT);

    var cells = document.getElementsByClassName('cell');
    for (var i=0,cell; i<cells.length; i++) {
        cell = cells[i];
        cell.innerHTML = '';
        cell.setAttribute('class','cell');
    }
}

function updatePlayer() {
    var p = game.playerActive;

    var ps = document.getElementsByClassName('player');
    for (var i=0; i<ps.length; i++) {
        ps[i].classList.remove('active');
        if (i == p-1) {
            ps[i].classList.add('active');
        }
    }

    //remove the player active 
    var ps = document.getElementsByClassName('meeple');
    for (var i=0; i<ps.length; i++) {
        ps[i].classList.remove('active');
    }

    var phd = document.getElementById('phase');
    phd.classList.remove('p1');
    phd.classList.remove('p2');
    phd.classList.add('p'+p);
    
}

var meepleId = 1;
function toggleMeeple(id) {

    console.log('toogleMeeple ' +  meepleId);
    
    meepleId = meepleId == 1 ? 2 : 1;
    if (id > 0) meepleId = id;

    var ps = document.getElementsByClassName('meeple');
    for (var i=0; i<ps.length; i++) {
        ps[i].classList.remove('active');
    }

    var mp = 'p'+game.playerActive + '_' + meepleId;
    mp = document.getElementById(mp);
    mp.classList.add('active');
    
    console.log('select meepele ' + game.playerActive + '_' + meepleId);

}

function getActiveMeeple() {
    var mp = 'p'+game.playerActive + '_' + meepleId;
    mp = document.getElementById(mp);
    return mp;
}

function prepareCellMoves() {
    avaliableMoves = [];
    //find moves and push into array

    var mp = getActiveMeeple();
    var r = mp.getAttribute('data-row');
    var c = mp.getAttribute('data-col');

    //get status current cell
    var currentCell = game.grid.getCell(r,c);
    var cs = currentCell.status;

    //get surrnuding cells
    avaliableMoves = game.grid.getSurrounding(r,c);

    //show move
    for (var i=0,c,m,invalid,tr,tc; i<avaliableMoves.length; i++) {

        //the move

        invalid = false;
        m = avaliableMoves[i];
        tr = m.row;
        tc = m.col;

        //validate move
        if (m.status == CELL_STATUS_BLOCK) {
            avaliableMoves.splice(i--,1);
            invalid = true;
            continue;
        } else if (cs == CELL_STATUS_LV0 && m.status > CELL_STATUS_LV1) {
            avaliableMoves.splice(i--,1);
            invalid = true;
            continue;
        } else if (cs == CELL_STATUS_LV1 && m.status > CELL_STATUS_LV2) {
            avaliableMoves.splice(i--,1);
            invalid = true;
            continue;
        } else if (cs == CELL_STATUS_LV2 && m.status > CELL_STATUS_LV3) {
            avaliableMoves.splice(i--,1);
            invalid = true;
            continue;
        } 

        //has meeple
        if (hasMeeple(m.row,m.col)) {
            avaliableMoves.splice(i--,1);
            invalid = true;
        }
    }

    for (var i=0,m,c; i<avaliableMoves.length; i++) {
        m = avaliableMoves[i];
        c = getDivCell(m.row,m.col);
        c.classList.add('range');
    }
}

function hasMeeple(r,c) {
    for (var i=0,m; i<meeplePositions.length; i++) {
        m = meeplePositions[i];
        if (m.row == r && m.col == c) return true;
    }   return false;
}

function prepareCellBuild() {
    avaliableMoves = [];

    var mp = getActiveMeeple();
    var r = Number(mp.getAttribute('data-row'));
    var c = Number(mp.getAttribute('data-col'));

    //get surrnuding cells
    avaliableMoves = game.grid.getSurrounding(r,c);

    //get status current cell
    var currentCell = game.grid.getCell(r,c);
    var cs = currentCell.status;

    //show move
    for (var i=0,c,m,invalid,tc,tr; i<avaliableMoves.length; i++) {

        m = avaliableMoves[i];
        tr = m.row;
        tc = m.col;
        invalid = false;

        //validate move
        if (m.status == CELL_STATUS_BLOCK) {
            avaliableMoves.splice(i--,1);
            invalid = true;
            continue;
        } 
        
        if (hasMeeple(m.row,m.col)) {
            avaliableMoves.splice(i--,1);
            invalid = true;
        }
    }

    for (var i=0,m,c; i<avaliableMoves.length; i++) {
        m = avaliableMoves[i];
        c = getDivCell(m.row,m.col);
        c.classList.add('build');
    }
}

var avaliableMoves = [];
var activeMoveCell = 0;

function toggleCellActive(id) {

    activeMoveCell = activeMoveCell+1 < avaliableMoves.length ? activeMoveCell+1 : 0;
    if (id >= 0) activeMoveCell = id;
    var cell = avaliableMoves[activeMoveCell];

    //remove active 
    var ps = document.getElementsByClassName('cell');
    for (var i=0; i<ps.length; i++) {
        ps[i].classList.remove('active');
    }

    //get the row
    tc = getDivCell(cell.row, cell.col);
    tc.classList.add('active');

    var g = document.getElementById('game');
    g.setAttribute('data-target', cell.status);
}

var mor, moc;
function moveMeeple(r,c,mp) {

    var target = getDivCell(r,c);

    var ot = target.offsetTop;
    var ol = target.offsetLeft;

    var p = game.playerActive ? game.playerActive : 1;

    if (mp == undefined) mp = getMeeple(p,meepleId);
    mp.style.top = ot + 'px';
    mp.style.left = ol + 'px';

    //set origin pos
    if (mp) {
        mor = Number(mp.getAttribute('data-row'));
        moc = Number(mp.getAttribute('data-col'));
    }

    mp.setAttribute('data-row', r);
    mp.setAttribute('data-col', c);
    mp.setAttribute('data-cell', r+'_'+c);

    updateMeeplePosition(mp, r,c);
}

var meeplePositions = [{},{},{},{}];
function updateMeeplePosition(mp, r, c) {

    var mid = mp.getAttribute('id').substring(1);
    var pid = mid.split('_')[0] == 1 ? 0 : 2;
        mid = mid.split('_')[1];
    var m = (pid)+(mid-1);
    meeplePositions[m] = {row: r, col: c};

    /*
    var s = '';
    for (var i=0; i<meeplePositions.length; i++) {
        s = s.concat('<p>'+meeplePositions[i].row+','+meeplePositions[i].col+'</p>');
    }
    document.getElementById('pos').innerHTML = s;
    */
}

function getMeeple(playerId,meepleId) {
    var mp = document.getElementById('p'+playerId+'_'+meepleId);
    return mp;
}

function buildCell(r,c) {
    var cell = game.grid.getCell(r,c);
    var cs = cell.status;
    var ncs = cs+1 <= CELL_STATUS_BLOCK ? cs+1 : CELL_STATUS_BLOCK;
    
    game.grid.setCellStatus(r, c, ncs);

    //update the cell div
    var cd = getDivCell(r,c);
    cd.innerHTML = getTower(ncs);
}

function getTower(lv) {
    var t = '';
    switch (lv) {
        case CELL_STATUS_LV1: t = '<div class="tower lv1"></div>'; break;
        case CELL_STATUS_LV2: t = '<div class="tower lv1"><div class="tower lv2"></div></div>'; break;
        case CELL_STATUS_LV3: t = '<div class="tower lv1"><div class="tower lv2"><div class="tower lv3"></div></div></div>'; break;
        case CELL_STATUS_BLOCK: t= '<div class="tower lv1"><div class="tower cap"></div></div>'; break;
    }
    return t;
}


function getDivCell(r,c) {
    
    console.log(game);

    if (game.grid) {
        return game.grid.getCell(r,c).div;
    }

    var cell = document.querySelector("#r" + r + " #c" + c);
    return cell;
}

function setPhase(id) {
    game.turnPhase = id;

    //update the controls
    var ctrls = document.getElementById('controls');
    ctrls.setAttribute('data-phase', id);

    //remove the default range
    var ps = document.getElementsByClassName('cell');
    for (var i=0; i<ps.length; i++) {
        ps[i].classList.remove('active');
        ps[i].classList.remove('range');
        ps[i].classList.remove('build');
    }

    var phb = document.getElementById('phase');
    phb = phb.getElementsByTagName('p')[0];
    phb.innerHTML = phaseTips[id];
    
    //disbale button
    var cancelBtn = document.getElementById('game_cancel');
    var selectBtn = document.getElementById('game_select');
    var actionBtn = document.getElementById('game_action');

    if (id <= PHASE_MEEPLE) {
        cancelBtn.classList.add('inactive');
    } else {
        cancelBtn.classList.remove('inactive');
    }

    if (id == PHASE_CONFIRM) {
        selectBtn.classList.add('inactive');
        actionBtn.classList.add('confirm');
        cancelBtn.classList.add('cancel');
    } else {
        selectBtn.classList.remove('inactive');
        actionBtn.classList.remove('confirm');
        cancelBtn.classList.remove('cancel');
    }



    switch (id) {
        case PHASE_MEEPLE:
        case PHASE_MOVE:
                toggleMeeple(meepleId);
                prepareCellMoves();
                toggleCellActive(0);
        break;
        case PHASE_BUILD:
                prepareCellBuild();
                toggleCellActive(0);
                break;
        case PHASE_CONFIRM: //confirm break;
    }
}

function endTurn() {  
    game.nextPlayer();
    updatePlayer();
    setPhase(PHASE_MOVE);
    
}