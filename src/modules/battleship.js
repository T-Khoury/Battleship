import { Player } from "./player";
import { createBoards, renderBoards } from "./dom";

const game = {
    player: null,
    cpu: null,
    activePlayer: null,
    startCPUGame() {
        game.player = Player('player');
        game.cpu = Player('cpu');
        createBoards(game.player, game.cpu);

        game.player.gameBoard.placeShip('a1', 'a4');
        game.player.gameBoard.placeShip('i6', 'i10');
        game.player.gameBoard.placeShip('f4', 'g4');
        game.player.gameBoard.placeShip('d8', 'f8');
        game.player.gameBoard.placeShip('c2', 'e2');

        this.randomCpuShips();

        renderBoards(game.player, game.cpu);

        game.activePlayer = game.player;
    },
    randomCpuShips() {
        let carrierCoords = game.getOpenCoordinates(game.cpu.gameBoard, 5);
        game.cpu.gameBoard.placeShip(carrierCoords[0], carrierCoords[1]);

        let battleshipCoords = game.getOpenCoordinates(game.cpu.gameBoard, 4);
        game.cpu.gameBoard.placeShip(battleshipCoords[0], battleshipCoords[1]);

        let destroyerCoords = game.getOpenCoordinates(game.cpu.gameBoard, 3);
        game.cpu.gameBoard.placeShip(destroyerCoords[0], destroyerCoords[1]);

        let submarineCoords = game.getOpenCoordinates(game.cpu.gameBoard, 3);
        game.cpu.gameBoard.placeShip(submarineCoords[0], submarineCoords[1]);

        let patrolCoords = game.getOpenCoordinates(game.cpu.gameBoard, 2);
        game.cpu.gameBoard.placeShip(patrolCoords[0], patrolCoords[1]);

    },

    getOpenCoordinates(board, shipLength) {
        let rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        let direction = (Math.floor(Math.random() * 2) === 1) ? "Vertical" : "Horizontal";
        let carrierRowStart;
        let carrierRowEnd;
        let carrierColStart;
        let carrierColEnd;
        let carrierRowStartIndex;
        switch (shipLength) {
            case 5:
                if (direction === "Horizontal") {
                    carrierRowStart = rows[Math.floor(Math.random() * 10)];
                    carrierRowEnd = carrierRowStart;
                    carrierColStart = Math.floor(Math.random() * 6 + 1);
                    carrierColEnd = carrierColStart + 4;
                } else if (direction === "Vertical") {
                    carrierRowStartIndex = Math.floor(Math.random() * 6)
                    carrierRowStart = rows[carrierRowStartIndex];
                    carrierRowEnd = rows[carrierRowStartIndex + 4];
                    carrierColStart = Math.floor(Math.random() * 10 + 1);
                    carrierColEnd = carrierColStart;
                }
                break
            case 4:
                if (direction === "Horizontal") {
                    carrierRowStart = rows[Math.floor(Math.random() * 10)];
                    carrierRowEnd = carrierRowStart;
                    carrierColStart = Math.floor(Math.random() * 7 + 1);
                    carrierColEnd = carrierColStart + 3;
                } else if (direction === "Vertical") {
                    carrierRowStartIndex = Math.floor(Math.random() * 7)
                    carrierRowStart = rows[carrierRowStartIndex];
                    carrierRowEnd = rows[carrierRowStartIndex + 3];
                    carrierColStart = Math.floor(Math.random() * 10 + 1);
                    carrierColEnd = carrierColStart;
                }
                break
            case 3:
                if (direction === "Horizontal") {
                    carrierRowStart = rows[Math.floor(Math.random() * 10)];
                    carrierRowEnd = carrierRowStart;
                    carrierColStart = Math.floor(Math.random() * 8 + 1);
                    carrierColEnd = carrierColStart + 2;
                } else if (direction === "Vertical") {
                    carrierRowStartIndex = Math.floor(Math.random() * 8)
                    carrierRowStart = rows[carrierRowStartIndex];
                    carrierRowEnd = rows[carrierRowStartIndex + 2];
                    carrierColStart = Math.floor(Math.random() * 10 + 1);
                    carrierColEnd = carrierColStart;
                }
                break
            case 2:
                if (direction === "Horizontal") {
                    carrierRowStart = rows[Math.floor(Math.random() * 10)];
                    carrierRowEnd = carrierRowStart;
                    carrierColStart = Math.floor(Math.random() * 9 + 1);
                    carrierColEnd = carrierColStart + 1;
                } else if (direction === "Vertical") {
                    carrierRowStartIndex = Math.floor(Math.random() * 9)
                    carrierRowStart = rows[carrierRowStartIndex];
                    carrierRowEnd = rows[carrierRowStartIndex + 1];
                    carrierColStart = Math.floor(Math.random() * 10 + 1);
                    carrierColEnd = carrierColStart;
                }
                break
        }
        let startCoord = `${carrierRowStart}${carrierColStart}`;
        let endCoord = `${carrierRowEnd}${carrierColEnd}`;
        let cells = board.returnCells(startCoord, endCoord);
        let coordinates

        while (cells.some((cell) => cell.ship !== null)) {
            coordinates = game.getOpenCoordinates(board, shipLength);
            startCoord = coordinates[0];
            endCoord = coordinates[1];
            cells = board.returnCells(startCoord, endCoord);
        }

        return [startCoord, endCoord]
        

    },

    checkGameOver(target) {
        return target.gameBoard.allShipsSunk();
    },
    
    cpuGameLoop(coordinates) {
        if (game.activePlayer === game.player && game.cpu.gameBoard.receiveAttack(coordinates) !== 'Error: already hit') {
            game.cpu.gameBoard.receiveAttack(coordinates);
            renderBoards(game.player, game.cpu);
            game.activePlayer = game.cpu;
            if (game.checkGameOver(game.cpu)) {
                return 'Game over- Player wins'
            }
            setTimeout(() => {
                game.cpu.randomMove(game.player.gameBoard);
                renderBoards(game.player, game.cpu);
                if (game.checkGameOver(game.player)) {
                    return 'Game over- CPU wins'
                };
                game.activePlayer = game.player
            }, "700");
        }
    }
}

export { game }

