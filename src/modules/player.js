import { Gameboard } from "./gameboard"

function Player(name) {
    let player = {
        name,
        gameBoard: null,
        randomMove(enemyBoard) {
           let rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
           let randomRow = rows[Math.floor(Math.random() * 10)];
           let randomCol = Math.floor(Math.random() * 10 + 1);
           let randomAttack = `${randomRow}${randomCol}`;

            if (enemyBoard.returnCell(randomAttack).attacked) {
                this.randomMove(enemyBoard);
            } else {
                enemyBoard.receiveAttack(randomAttack);
                return randomAttack
            }
        },
        makeAttack(enemyBoard, coordinates) {
            if (enemyBoard.returnCell(coordinates).attacked) {
                return 'Please enter new coordinates'
            }
            enemyBoard.receiveAttack(coordinates);
        }

    }
    player.gameBoard = Gameboard();
    return player
}

export { Player }