import { Ship } from '../modules/ship';


describe('Ship methods', () => {
    let submarine = Ship(3);

    test('Ship with no hits returns false isSunk', () => {
        expect(submarine.isSunk()).toBe(false)
    })

    test('hit function increments hits by 1', () => {
        submarine.hit();
        expect(submarine.hitNumber).toEqual(1)
    })

    test('Ship with less than length number of hits returns false isSunk', () => {
        submarine.hit();
        expect(submarine.isSunk()).toBe(false)
    })

    test('Ship with n length and n hits returns true isSunk', () => {
        submarine.hit();
        expect(submarine.isSunk()).toBe(true)
    })
})

