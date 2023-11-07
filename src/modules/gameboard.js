import { Ship } from "./ship";

function Gameboard() {
    let gameboard = {
        board: [],
        ships: {
            carrier: null,
            battleship: null,
            destroyer: null,
            submarine: null,
            patrolboat: null
        }, 
        createBoard() {
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    let rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
                    let cell  = {
                        ship: null,
                        attacked: false,
                        row: `${rows[i]}`,
                        col: `${j + 1}`
                    }
                    this.board.push(cell)
                }
            }
        },
        returnCell(coordinates) {
            let row = coordinates[0].toUpperCase();
            let col = coordinates.slice(1);
            let cell = this.board.filter((cell) => cell.row == row && cell.col == col)[0];

            return cell
        },
        assignShip(ship) {
            switch (ship.length) {
                case 5:
                    this.ships.carrier = ship;
                    break;
                case 4:
                    this.ships.battleship = ship;
                    break;
                case 3:
                    if (!this.ships.destroyer) {
                        this.ships.destroyer = ship;
                    } else {
                        this.ships.submarine = ship;
                    }
                    break;
                case 2:
                    this.ships.patrolboat = ship;
                    break;
            }
        },
        placeShip(start, end) {
            console.log(start[0], end[1])
            let endcol = end.slice(1)
            let startcol = start.slice(1)
            let newShip = null
            if (start[0].toUpperCase() === end[0].toUpperCase()) {
                let shipSize = Math.abs(parseInt(start[1]) - parseInt(endcol)) + 1;
                newShip = Ship(shipSize);
                this.assignShip(newShip);

                let chosenCells = this.board.filter((cell) => (cell.row == start[0].toUpperCase() && (cell.col <= Math.max(parseInt(startcol), parseInt(endcol)) && cell.col >= Math.min(parseInt(startcol), parseInt(endcol)))))

                for (const cell in chosenCells) {
                    chosenCells[cell].ship = newShip
                };

            } else {
                let letters = {
                    'A': 1,
                    'B': 2,
                    'C': 3,
                    'D': 4,
                    'E': 5,
                    'F': 6,
                    'G': 7,
                    'H': 8,
                    'I': 9,
                    'J': 10
                }
                let shipSize = Math.abs(letters[start[0].toUpperCase()] - letters[end[0].toUpperCase()]) + 1;
                newShip = Ship(shipSize);
                this.assignShip(newShip);

                let chosenCells = this.board.filter((cell) => (cell.col == startcol && (letters[cell.row] <= Math.max(letters[start[0].toUpperCase()], letters[end[0].toUpperCase()]) && letters[cell.row] >= Math.min(letters[start[0].toUpperCase()], letters[end[0].toUpperCase()]))));

                for (const cell in chosenCells) {
                    chosenCells[cell].ship = newShip
                };

            }
            return newShip
        },
        receiveAttack(coordinates) {
            
        }
    }

    return gameboard
}

export { Gameboard }