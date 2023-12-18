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

test("Gameboard is able to place ship vertically at given coordinates", () => {
    const battleship = myModules.ship(4, 0, false);
    myModules.gameboard.receiveShip(2, 3, 'vertical', battleship)
    expect(myModules.gameboard.leBoard[2][3]).toBe(1)
    expect(myModules.gameboard.leBoard[3][3]).toBe(1)
    expect(myModules.gameboard.leBoard[4][3]).toBe(1);
    expect(myModules.gameboard.leBoard[5][3]).toBe(1);
    expect(myModules.gameboard.leBoard[6][3]).toBe(0);
})

test("Gameboard is able to place ship horizontally at given coordinates", () => {
  const battleship = myModules.ship(4, 0, false);
  myModules.gameboard.receiveShip(2, 3, null, battleship);
  expect(myModules.gameboard.leBoard[2][3]).toBe(1);
  expect(myModules.gameboard.leBoard[2][4]).toBe(1);
  expect(myModules.gameboard.leBoard[2][5]).toBe(1);
  expect(myModules.gameboard.leBoard[2][6]).toBe(1);
  expect(myModules.gameboard.leBoard[2][7]).toBe(0);
});