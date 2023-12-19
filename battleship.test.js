const myModules = require("./battleship.js")

// Fix ships array. It should be enacted within receiveship, not separately

test("Ship function returns a Battleship object correctly", () => {
    const battleship = myModules.ship(4, 0, false, 1)
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
    const cruiser = myModules.ship(4, 0, false, 2);
    myModules.gameboard.receiveShip(0, 0, "horizontal", cruiser)
    expect(myModules.gameboard.leBoard[0][0]).toBe(cruiser.shipId)
    expect(myModules.gameboard.leBoard[0][3]).toBe(cruiser.shipId);
    expect(myModules.gameboard.leBoard[0][5]).toBe(0);
})

test("Gameboard is able to place ship vertically at given coordinates", () => {
  const carrier = myModules.ship(5, 0, false, 3);
  myModules.gameboard.receiveShip(5, 9, 'vertical', carrier);
  expect(myModules.gameboard.leBoard[4][9]).toBe(0)
  expect(myModules.gameboard.leBoard[5][9]).toBe(carrier.shipId);
  expect(myModules.gameboard.leBoard[9][9]).toBe(carrier.shipId);
});

test("gameboard should not be able to place a ship vertically in a spot without sufficient space", () => {
    const victory = myModules.ship(4, 0, false, 4);
    let result = myModules.gameboard.receiveShip(8, 0, 'vertical', victory);
    expect(result).toBe("You can't place your ship there Admiral!")
})


test("gameboard should not be able to place a ship horizontally in a spot without sufficient space", () => {
  const endeavour = myModules.ship(4, 0, false, 5);
  let result = myModules.gameboard.receiveShip(10, 7, 'horizontal', endeavour);
  expect(result).toBe("You can't place your ship there Admiral!");
});

test("gameboard should not be able to place a ship in an occupied space", () => {
    const destroyer = myModules.ship(3, 0, false, 6)
    let result = myModules.gameboard.receiveShip(0, 0, 'horizontal', destroyer)
    expect(result).toBe("A ship already occupies this space Admiral!");
})

test("Gameboard receive attack function correctly registers a hit", () => {
    let result = myModules.gameboard.receiveAttack(0, 0)
    expect(myModules.ships[0].hitsTaken).toBe(1)
    expect(result).toBe("Direct hit!")
})

test("Gameboard receive attack function correctly registers a miss", () => {
  let result = myModules.gameboard.receiveAttack(3, 3);
  expect(result).toBe("Miss!");
  expect(myModules.gameboard.leBoard[3][3]).toBe('X');
});

test("Gameboard is able to register the fleet being destroyed", () => {
    myModules.gameboard.receiveAttack(0, 1)
    myModules.gameboard.receiveAttack(0, 2);
    myModules.gameboard.receiveAttack(0, 3);
    myModules.gameboard.receiveAttack(9, 9);
    myModules.gameboard.receiveAttack(8, 9);
    myModules.gameboard.receiveAttack(7, 9);
    myModules.gameboard.receiveAttack(6, 9);
    let result = myModules.gameboard.receiveAttack(5, 9);
    expect(result).toBe("The fleet has been destroyed!");
    myModules.gameboard.printBoard();
})