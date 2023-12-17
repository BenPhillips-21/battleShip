const myModules = require("./battleship.js")

test("Ship function returns a Battleship object correctly", () => {
    const battleship = myModules.ship(4, 0, false)
    expect(battleship.length).toBe(4)
    expect(battleship.hitsTaken).toBe(0)
    expect(battleship.sunken).toBeFalsy()
    battleship.hit()
    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.isSunk()
    expect(battleship.sunken).toBeTruthy();
})