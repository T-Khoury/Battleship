import { Player } from "./player";
import { createBoards, renderBoards } from "./dom";

const game = {
    player: null,
    cpu: null,
    startCPUGame() {
        game.player = Player('player');
        game.cpu = Player('cpu');
        createBoards(game.player, game.cpu);

        game.player.gameBoard.placeShip('a1', 'a4');
        game.player.gameBoard.placeShip('i6', 'i10');
        game.player.gameBoard.placeShip('f4', 'g4');
        game.player.gameBoard.placeShip('d8', 'f8');
        game.player.gameBoard.placeShip('c2', 'e2');

        game.cpu.gameBoard.placeShip('e2', 'e6');
        game.cpu.gameBoard.placeShip('g10', 'j10');
        game.cpu.gameBoard.placeShip('b3', 'b5');
        game.cpu.gameBoard.placeShip('h1', 'h3');
        game.cpu.gameBoard.placeShip('b10', 'c10');

        renderBoards(game.player, game.cpu);
        
        /*while (!playerOne.gameBoard.allShipsSunk() && !playerTwo.gameBoard.allShipsSunk()) {
    
        }
        let activePlayer = player
        while (!gameOver) {
    
        } */
    },

    checkGameOver(target) {
        return target.gameBoard.allShipsSunk();
    },
    
    cpuGameLoop(coordinates) {
        game.cpu.gameBoard.receiveAttack(coordinates);
        renderBoards(game.player, game.cpu)
        if (game.checkGameOver(game.cpu)) {
            return 'Game over- Player wins'
        }
        game.cpu.randomMove(game.player.gameBoard);
        renderBoards(game.player, game.cpu);
        if (game.checkGameOver(game.player)) {
            return 'Game over- CPU wins'
        };

    }
}

export { game }

