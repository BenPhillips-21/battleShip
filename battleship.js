const ship = (length, hitsTaken, sunken) => ({
  length,
  hitsTaken,
  sunken,
  hit: function () {
    this.hitsTaken += 1
    return this.hitsTaken
  },
  isSunk: function () {
    if (this.hitsTaken === this.length) {
        this.sunken = true
        return this.sunken
    }
  }
});

const gameboard = {
  leBoard: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  printBoard: function () {
    console.log(this.leBoard.map((row) => row.join(" ")).join("\n"));
  },
  receiveShip: function (coordX, coordY, placementDirection, ship) {
if (coordX > 9 || coordY > 9) {
  return "You can't place your ship there Admiral!";
}
if (placementDirection === 'vertical') {
    if (coordX + (ship.length - 1) > 9) {
      return "You can't place your ship there Admiral!";
    }
    let coordXcopy = coordX;
    for (let i = 0; i < ship.length; i++) {
      if (this.leBoard[coordXcopy][coordY]) {
        return "A ship already occupies this space Admiral!"
      }
      coordXcopy++
    }
  let i = 0;
  while (i < ship.length) {
    this.leBoard[coordX][coordY] = 1;
    coordX += 1;
    i++;
  }
} else {
  if (coordY + (ship.length - 1) > 9) {
    return "You can't place your ship there Admiral!";
  }
    let coordYcopy = coordY;
    for (let i = 0; i < ship.length; i++) {
      if (this.leBoard[coordX][coordYcopy]) {
        return "A ship already occupies this space Admiral!";
      }
      coordYcopy++;
    }
  let t = 0;
  while (t < ship.length) {
    this.leBoard[coordX][coordY] = 1;
    coordY += 1;
    t++;
  }
}
  }
};

// const battleship = ship(4, 0, false);
// let result = gameboard.receiveShip(3, 6, 'vertical', battleship)
// console.log(result)
// gameboard.printBoard();

// const carrier = ship(5, 0, false);
// let result1 = gameboard.receiveShip(4, 0, "horizontal", carrier);
// console.log(result1);
// gameboard.printBoard();


module.exports = { ship, gameboard }