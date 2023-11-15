import { game } from "./battleship";

let playerOneContainer = document.getElementById('player-one-container');
let playerTwoContainer = document.getElementById('player-two-container');


function renderBoards(playerOne, playerTwo) {
    let playerOneCells = document.querySelectorAll('#player-one-container .cell');
    let playerTwoCells = document.querySelectorAll('#player-two-container .cell');
    playerOne.gameBoard.board.forEach((cell) => {
        if (cell.ship && !cell.attacked) {
            playerOneCells[playerOne.gameBoard.board.indexOf(cell)].classList.add('ship');
        } else if (cell.ship && cell.attacked) {
            if (cell.ship.isSunk() === false) {
                playerOneCells[playerOne.gameBoard.board.indexOf(cell)].classList.add('hit');
            } else {
                playerOneCells[playerOne.gameBoard.board.indexOf(cell)].classList.add('sunk')
            }
        } else if (cell.attacked) {
            playerOneCells[playerOne.gameBoard.board.indexOf(cell)].classList.add('miss');
        }
    });
    playerTwo.gameBoard.board.forEach((cell) => {
        if (cell.ship && cell.attacked) {
            if (cell.ship.isSunk() === false) {
            playerTwoCells[playerTwo.gameBoard.board.indexOf(cell)].classList.add('enemy-hit');
            } else {
                playerTwoCells[playerTwo.gameBoard.board.indexOf(cell)].classList.add('enemy-sunk')
            }
        } else if (cell.attacked)  {
            playerTwoCells[playerTwo.gameBoard.board.indexOf(cell)].classList.add('enemy-miss');
        }    
    });
};

function createBoards() {
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.classList.add('cell');
        playerOneContainer.appendChild(div);
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
            const div = document.createElement('div');
            div.classList.add('cell');
            div.dataset.coordinates = `${rows[i]}${j + 1}`

            div.addEventListener('click', () => {
                game.cpuGameLoop(div.dataset.coordinates)
    
            })
            playerTwoContainer.appendChild(div);
        }
    }
}



export { renderBoards, createBoards }