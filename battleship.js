let ships = [];
const ship = (length, hitsTaken, sunken, shipId) => ({
  length,
  hitsTaken,
  sunken,
  shipId,
  hit: function () {
    this.hitsTaken += 1;
    return this.hitsTaken;
  },
  isSunk: function () {
    if (this.hitsTaken === this.length) {
      this.sunken = true;
      return this.sunken;
    }
  },
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  printBoard: function () {
    console.log(this.leBoard.map((row) => row.join(" ")).join("\n"));
  },
  receiveShip: function (coordX, coordY, placementDirection, ship) {
    if (coordX > 9 || coordY > 9) {
      return "You can't place your ship there Admiral!";
    }
    if (placementDirection === "vertical") {
      if (coordX + (ship.length - 1) > 9) {
        return "You can't place your ship there Admiral!";
      }
      let coordXcopy = coordX;
      for (let i = 0; i < ship.length; i++) {
        if (this.leBoard[coordXcopy][coordY]) {
          return "A ship already occupies this space Admiral!";
        }
        coordXcopy++;
      }
      let i = 0;
      while (i < ship.length) {
        this.leBoard[coordX][coordY] = ship.shipId;
        coordX += 1;
        i++;
      }
      ships.push(ship)
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
        this.leBoard[coordX][coordY] = ship.shipId;
        coordY += 1;
        t++;
      }
      ships.push(ship);
    }
  },
checkFleet: function() {
  let fleet = [];
  for (var i = 0; i < ships.length; i++) {
    fleet.push(ships[i].sunken);
  }

  if (fleet.every(ship => ship === true)) {
    return 'The fleet has been destroyed!';
  } else {
    return 'The fleet is still in tact!'
  }
},
  receiveAttack: function (coordX, coordY) {
    if (this.leBoard[coordX][coordY] > 0) {
      for (var i = 0; i < ships.length; i++) {
        if (this.leBoard[coordX][coordY] === ships[i].shipId) {
          ships[i].hit();
          ships[i].isSunk();
          this.leBoard[coordX][coordY] = "X";
          let result = gameboard.checkFleet();
          console.log(result);
          if (result === "The fleet has been destroyed!") {
            return result
          } else {
            return "Direct hit!";
          } 
        }
      }
    } else {
      this.leBoard[coordX][coordY] = "X";
      return "Miss!";
    }
  },
};

// let x = ship(5, 0, false, 1)
// gameboard.receiveShip(5, 5, 'vertical', x)
// let result = gameboard.checkFleet()
// console.log(result)

module.exports = { ship, gameboard, ships };
