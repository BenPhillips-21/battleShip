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
    console.log(this.leBoard);
  },
  receiveShip: function (coordX, coordY, placementDirection, ship) {
if (placementDirection === 'vertical') {
  let i = 0;
  while (i < ship.length) {
    this.leBoard[coordX][coordY] = 1;
    coordX += 1;
    i++;
  }
} else {
  let i = 0;
  while (i < ship.length) {
    this.leBoard[coordX][coordY] = 1;
    coordY += 1;
    i++;
      }
    }
  }
};

module.exports = { ship, gameboard }