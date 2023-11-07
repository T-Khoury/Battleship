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
        expect(gameboard.ships.battleship).not.toBe(null)
    })
    test('Receiving an attack hits the ship at the coordinates if there is one', () => {
        let gameboard = Gameboard();
        gameboard.createBoard();
        gameboard.placeShip('a1', 'a4');

        
        expect(gameboard.receiveAttack('a3')).toBe('Hit');
        expect(gameboard.returnCell('a3').ship.hitNumber).toBe(1);
        expect(gameboard.board.returnCell('a3').attacked).toBe(true);
    })
    test('Attacking an empty cell records a missed attack', () => {
        let gameboard = Gameboard();
        gameboard.createBoard();

        expect(gameboard.receiveAttack('B2')).toBe('Miss');
        expect(gameboard.board.returnCell('b2').attacked).toBe(false);

        expect(gameboard.missedAttacks.includes('B2')).toBe(true);
    })
        
})