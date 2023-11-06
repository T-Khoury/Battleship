import { Gameboard } from "../modules/gameboard";

describe('Gameboard methods', () => {
    
    
    test('Placing a ship in an empty location creates and assigns the ship object of appropriate length to those cells', () => {
        let gameboard1 = Gameboard();
        gameboard1.createBoard();
        gameboard1.placeShip('b2', 'F2');
        console.log(gameboard1.board.find((cell) => cell.row === 'B' && cell.col === '2').ship.length);
        expect(gameboard1.board.find((cell) => cell.row === 'B' && cell.col === '2').ship.length).toBe(5);
    })
    test('Placing a ship assigns the ship to the board', () => {
        let gameboard2 = Gameboard();
        gameboard2.createBoard();
        gameboard2.placeShip('C3', 'C6');
        expect(gameboard2.ships.battleship).not.toBe(null)
    })
        
})