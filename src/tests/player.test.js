import { Player } from "../modules/player";
describe('Player methods', () => {


    test('Player makeAttack correctly attacks a selected enemy board', () => {
        let mike = Player('mike');
        let tom = Player('tom');

        mike.makeAttack(tom.gameBoard, 'D1');

        expect(tom.gameBoard.returnCell('D1').attacked).toBe(true);

    })
    
    test('Player randomAttack move for computer attacks a random enemy cell which has not been attacked yet', () => {
        let bill = Player('bill');
        let sam = Player('sam');

        expect(bill.gameBoard.returnCell(sam.randomMove(bill.gameBoard)).attacked).toBe(true);
    })
})