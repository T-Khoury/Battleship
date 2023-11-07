import { Gameboard } from "../modules/gameboard";

describe('Gameboard methods', () => {
    
    
    test('Placing a ship in an empty location creates and assigns the ship object of appropriate length to those cells', () => {
        let gameboard = Gameboard();
        gameboard.createBoard();
        gameboard.placeShip('b2', 'F2');

        expect(gameboard.board.find((cell) => cell.row === 'B' && cell.col === '2').ship.length).toBe(5);
        gameboard.placeShip('D2', 'D4');
        expect(gameboard.board.find((cell) => cell.row === 'D' && cell.col === '3').ship).not.toBe(null);

    })
    test('Placing a ship assigns the ship to the board', () => {
        let gameboard = Gameboard();
        gameboard.createBoard();
        gameboard.placeShip('C3', 'C6');
        expect(gameboard.ships.battleship).not.toBe(null);
    })
    test('Receiving an attack hits the ship at the coordinates if there is one', () => {
        let gameboard = Gameboard();
        gameboard.createBoard();
        gameboard.placeShip('a1', 'a4');

        
        expect(gameboard.receiveAttack('a3')).toBe('Hit');
        expect(gameboard.returnCell('a3').ship.hitNumber).toBe(1);
        expect(gameboard.returnCell('a3').attacked).toBe(true);
    })
    test('Attacking an empty cell records a missed attack', () => {
        let gameboard = Gameboard();
        gameboard.createBoard();

        expect(gameboard.receiveAttack('B2')).toBe('Miss');
        expect(gameboard.returnCell('b2').attacked).toBe(true);

        expect(gameboard.missedAttacks.includes('B2')).toBe(true);
    })

    test('Gameboard can report whether or not all ships are sunk', () => {
        let gameboard = Gameboard();
        gameboard.createBoard();

        expect(gameboard.allShipsSunk()).toBe(false);

        gameboard.placeShip('a1', 'a2');
        gameboard.placeShip('B1', 'b3');
        gameboard.placeShip('c1', 'c3');
        gameboard.placeShip('d1', 'd4');
        gameboard.placeShip('e1', 'E5');

        expect(gameboard.allShipsSunk()).toBe(false);

        let attacks = ['a1', 'a2', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3', 'd1', 'd2', 'd3', 'd4', 'e1', 'e2', 'e3', 'e4', 'e5'];
        attacks.forEach((coordinate) => gameboard.receiveAttack(coordinate));

        expect(gameboard.allShipsSunk()).toBe(true);
    })
        
})