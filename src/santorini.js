var game;
var SCREEN_TITLE = 'title';
var SCREEN_LOBBY = 'lobby';

window.onload = function() {
    game = new Game();
    game.display.show('title');

};


addEventListener('onScreenShow', function(e) {
    if (e.id == 'ttle') {
        game.display.set(SCREEN_LOBBY);
    }

    if (e.id == 'lobby') {
        
        //reset interface
        //get the current game from server

    }
});

addEventListener('onScreenHide', function(e) {

    if (e.id == 'lobby') {
        //empty the lobby stuff
        //disable the join button
        //reset it basically
    }
});



addEventListener('onButtonClick', function(e) {
    if (e.id == 'new') {
        game.display.set(SCREEN_LOBBY);
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