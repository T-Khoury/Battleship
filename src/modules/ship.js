function Ship(length) {
    let ship = {
        length,
        hitNumber: 0,
        sunk: false,
        hit() {
            this.hitNumber ++;
            this.isSunk();
        },
        isSunk() {
            if (this.length === this.hitNumber) {
                this.sunk = true
                return true
            } else {
                return false
            }
        }
    }
    return ship
}

export { Ship }