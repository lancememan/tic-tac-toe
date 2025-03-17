const Player = (name, token) => {
    return { name, token }
}

const player1 = Player('Player1', 'X');
const player2 = Player('Player2', 'O');

const Gameboard = (() => {
    let gameboard = [];

    for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
            row.push("");
        }
        gameboard.push(row);
    }

    return gameboard;
})();

const GameController = () => {
    let board = Gameboard;
    const players = [player1, player2];
    let currentPlayer = players[0];

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }

    const gameBoard = () => {
        return board;
    }

    const getCurrentPlayer = () => {
        return currentPlayer.name;
    }

    const getPlayerToken = () => {
        return currentPlayer.token;
    }

    const placeToken = (row, col) => {
        if (board[row][col] === "" && !checkWinner()) {
            board[row][col] = currentPlayer.token;
            if (checkWinner()) {
                console.log("Winner: " + currentPlayer.name);
            } else {
                switchPlayer();
                console.log("Current Turn: " + getCurrentPlayer());
            }
            console.log(board);
        }
    }

    const checkWinner = () => {
        let token = currentPlayer.token;

        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === token && board[i][1] === token && board[i][2] === token) {
                return true;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === token && board[1][i] === token && board[2][i] === token) {
                return true;
            }
        }

        // Check diagonals
        if (board[0][0] === token && board[1][1] === token && board[2][2] === token) {
            return true;
        }

        if (board[0][2] === token && board[1][1] === token && board[2][0] === token) {
            return true;
        }

        return false;
    }
    
    const resetGame = () => {
        board.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                board[rowIndex][colIndex] = "";
            });
        });
        
        currentPlayer = players[0];
        return true;
    }

    return {
        getCurrentPlayer,
        placeToken,
        checkWinner,
        gameBoard,
        getPlayerToken,
        resetGame,
    }
}

const game = GameController();

function playerFormSubmit(game) {
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

    player1.name = player1Name;
    player2.name = player2Name;

    renderUI(game,true);
}

const form = document.getElementById('playerform');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    playerFormSubmit(game);
});

const GenerateBoard = ((game) => {
    const board = document.getElementById('board');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => {
                if(cell.textContent === "" && !game.checkWinner()){
                    cell.textContent = game.getPlayerToken();
                }
                game.placeToken(i, j);
                renderUI(game);                
            });
            row.appendChild(cell);
        }

        board.appendChild(row);
    }

})(game);

const renderUI = (game,reset) => {
    const winner = document.getElementById('winner');

    if(reset){
        game.resetGame();
        const board = document.getElementById('board');
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board.children[i].children[j].textContent = "";
            }
        }
        winner.textContent = "";
    }

    document.getElementById('currentPlayer').textContent = "Current Turn: " + game.getCurrentPlayer();
    document.getElementById('PlayerMarker').textContent = "Marker: "+ game.getPlayerToken();
    if(game.checkWinner()){
        winner.textContent = "Winner: " + game.getCurrentPlayer();
    }
    
};