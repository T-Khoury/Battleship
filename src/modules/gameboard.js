import { Ship } from "./ship";

function Gameboard() {
    let gameboard = {
        board: [],
        missedAttacks: [],
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
        returnCells(start, end) {
            let endcol = end.slice(1);
            let startcol = start.slice(1);
            let chosenCells
            if (start[0].toUpperCase() === end[0].toUpperCase()) {
                chosenCells = this.board.filter((cell) => (cell.row == start[0].toUpperCase() && (cell.col <= Math.max(parseInt(startcol), parseInt(endcol)) && cell.col >= Math.min(parseInt(startcol), parseInt(endcol)))));
            }  else {
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
                chosenCells = this.board.filter((cell) => (cell.col == startcol && (letters[cell.row] <= Math.max(letters[start[0].toUpperCase()], letters[end[0].toUpperCase()]) && letters[cell.row] >= Math.min(letters[start[0].toUpperCase()], letters[end[0].toUpperCase()]))));
            }
            return chosenCells
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
            let chosenCells = gameboard.returnCells(start, end);
            let shipSize = chosenCells.length;
            let newShip = Ship(shipSize);
            for (const cell in chosenCells) {
                chosenCells[cell].ship = newShip
            };
            gameboard.assignShip(newShip);
            return newShip
        },
        receiveAttack(coordinates) {
            let cell = this.returnCell(coordinates);
            if (cell.attacked) {
                return 'Error: already hit'
            } else {
                cell.attacked = true
                if (cell.ship) {
                    cell.ship.hit();
                    return 'Hit'
                } else {
                    this.missedAttacks.push(`${coordinates[0].toUpperCase()}${coordinates.slice(1)}`);
                    return 'Miss'
                }
                
            }

        },
        allShipsSunk() {
            let allShipsPlaced = true
            for (let ship in this.ships) {
                if (this.ships[ship] == null) {
                    allShipsPlaced = false;
                }
            }
            if (!allShipsPlaced) {
                return 'All ships not placed'
            } else {
                for (let ship in this.ships) {
                    if (this.ships[ship].isSunk() == false) {
                        return false
                    }
                }
                return true
            }


        }
    }

    gameboard.createBoard();

    return gameboard
}

export { Gameboard }