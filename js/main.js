const Player = (name, token) => {
    return { name, token }
}

const player1 = Player('Alice', 'X');
const player2 = Player('John', 'O');

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
    const board = Gameboard;
    const players = [player1, player2];
    let currentPlayer = players[0];

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }

    const getCurrentPlayer = () => {
        return currentPlayer.name;
    }

    const placeToken = (row, col) => {
        if (board[row][col] === "") {
            board[row][col] = currentPlayer.token;
            if (checkWinner()) {
                console.log("Winner: " + currentPlayer.name);
            } else {
                switchPlayer();
                console.log("Current Turn: " + getCurrentPlayer());
            }
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

    return {
        getCurrentPlayer,
        placeToken,
        checkWinner,
    }
}

const game = GameController();


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
                game.placeToken(i, j);
            });
            row.appendChild(cell);
        }

        board.appendChild(row);
    }

})();
