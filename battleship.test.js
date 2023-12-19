const myModules = require("./battleship.js")

// leBoard[Y][X]

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

test("Gameboard is able to place ship horizontally at given coordinates", () => {
    const battleship = myModules.ship(4, 0, false);
    myModules.gameboard.receiveShip(0, 0, "horizontal", battleship)
    expect(myModules.gameboard.leBoard[0][0]).toBe(1)
    expect(myModules.gameboard.leBoard[0][3]).toBe(1);
    expect(myModules.gameboard.leBoard[0][5]).toBe(0);
})

test("Gameboard is able to place ship vertically at given coordinates", () => {
  const carrier = myModules.ship(5, 0, false);
  myModules.gameboard.receiveShip(5, 9, 'vertical', carrier);
  myModules.gameboard.printBoard();
  expect(myModules.gameboard.leBoard[4][9]).toBe(0)
  expect(myModules.gameboard.leBoard[5][9]).toBe(1);
  expect(myModules.gameboard.leBoard[9][9]).toBe(1);
});

test("gameboard should not be able to place a ship vertically in a spot without sufficient space", () => {
    const battleship = myModules.ship(4, 0, false);
    let result = myModules.gameboard.receiveShip(8, 0, 'vertical', battleship);
    expect(result).toBe("You can't place your ship there Admiral!")
})


test("gameboard should not be able to place a ship horizontally in a spot without sufficient space", () => {
  const battleship = myModules.ship(4, 0, false);
  let result = myModules.gameboard.receiveShip(10, 7, 'horizontal', battleship);
  expect(result).toBe("You can't place your ship there Admiral!");
});

test("gameboard should not be able to place a ship in an occupied space", () => {
    myModules.gameboard.printBoard();
    const destroyer = myModules.ship(3, 0, false)
    let result = myModules.gameboard.receiveShip(0, 0, 'horizontal', destroyer)
    expect(result).toBe("A ship already occupies this space Admiral!");
})