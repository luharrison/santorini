var room = {
    id : 0001,
    password: '0000',
    status: 'active',       //empty active complete
    result: 'win.player_1', //active draw win . player (username.avatarId);
    game: 'eafeahuhEUheUHFEfjsdEIUPHFEWIWEjefnowe', //encoded board and positions
    turn: 0,

    player_active: 0,
    player_1: 'user1.av1',
    player_2: 'user2.av2', //data split with . username , avatarId
    player_3: 'user3.av1',
    player_4: '',
}

//send move

var GAME_RESULT_ACTIVE = 0;
var GAME_RESULT_WIN = 1;
var GAME_RESULT_DRAW = 2;

var result = game.getGameResult();

if (notComplete) {
    data.player_active = game.nextPlayer(); //change player
    data.game = game.getGameData(); //return encoded board and positions
} else if (gameResult == GAME_RESULT_ACTIVE) {

    data.player_active = 0;
    data.status = 'complete';
    data.result = game.getGameResult(); //win or draw

    if (draw) {
        data.result
    } else {

    }
}




/*
CREATE TABLE potluck (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(20),
    food VARCHAR(30),
    confirmed CHAR(1), 
    signup_date DATE);
*/