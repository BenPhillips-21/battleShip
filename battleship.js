// let ships = [];

import readline from "readline-sync";

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
  printBoard: function (player) {
    console.log(player.board.map((row) => row.join(" ")).join("\n"));
  },
  receiveShip: function (coordX, coordY, placementDirection, ship, player) {
    if (coordX > 9 || coordY > 9) {
      return "You can't place your ship there Admiral!";
    }
    if (placementDirection === "vertical") {
      if (coordX + (ship.length - 1) > 9) {
        return "You can't place your ship there Admiral!";
      }
      let coordXcopy = coordX;
      for (let i = 0; i < ship.length; i++) {
        if (player.board[coordXcopy][coordY]) {
          return "A ship already occupies this space Admiral!";
        }
        coordXcopy++;
      }
      let i = 0;
      while (i < ship.length) {
        player.board[coordX][coordY] = ship.shipId;
        coordX += 1;
        i++;
      }
    } else {
      if (coordY + (ship.length - 1) > 9) {
        return "You can't place your ship there Admiral!";
      }
      let coordYcopy = coordY;
      for (let i = 0; i < ship.length; i++) {
        if (player.board[coordX][coordYcopy]) {
          return "A ship already occupies this space Admiral!";
        }
        coordYcopy++;
      }
      let t = 0;
      while (t < ship.length) {
        player.board[coordX][coordY] = ship.shipId;
        coordY += 1;
        t++;
      }
    }
  },
checkFleet: function(playerFleet) {
  let fleetSunkenStatus = [];
  for (var i = 0; i < playerFleet.length; i++) {
    fleetSunkenStatus.push(playerFleet[i].sunken);
  }
  console.log(fleetSunkenStatus)

  if (fleetSunkenStatus.every((ship) => ship === true)) {
    return "The fleet has been destroyed!";
  } else {
    return "The fleet is still in tact!";
  }
},
  receiveAttack: function (coordX, coordY, player) {
    if (player.board[coordX][coordY] > 0) {
      for (var i = 0; i < player.fleet.length; i++) {
        if (player.board[coordX][coordY] === player.fleet[i].shipId) {
          player.fleet[i].hit();
          player.fleet[i].isSunk();
          console.log(player.fleet[i])
          player.board[coordX][coordY] = "X";
          let result = gameboard.checkFleet(player.fleet);
          console.log(result);
          if (result === "The fleet has been destroyed!") {
            return result;
          } else {
            return "Direct hit!";
          }
        }
      }
    } else {
      player.board[coordX][coordY] = "X";
      return "Miss!";
    }
  },
};

console.log(gameboard.leBoard[1][0])
console.log('le print')
const createPlayer = (name, fleet) => {
  return {
    name,
    fleet,
    board: [...gameboard.leBoard.map((row) => [...row])],
  };
};

const carrier1 = ship(5, 0, false, 5)
const battleship1 = ship(4, 0, false, 4);
const destroyer1 = ship(3, 0, false, 3);
const submarine1 = ship(3, 0, false, 2);
const patrolboat1 = ship(2, 0, false, 1);

const carrier2 = ship(5, 0, false, 5);
const battleship2 = ship(4, 0, false, 4);
const destroyer2 = ship(3, 0, false, 3);
const submarine2 = ship(3, 0, false, 2);
const patrolboat2 = ship(2, 0, false, 1);

const leFleet1 = [carrier1, battleship1, destroyer1, submarine1, patrolboat1];
const leFleet2 = [carrier2, battleship2, destroyer2, submarine2, patrolboat2];

const player1 = createPlayer("Admiral Nelson", leFleet1);
const player2 = createPlayer("Computer", leFleet2);

// let result = gameboard.checkFleet(player1.fleet);
// console.log(result)
// gameboard.receiveShip(0, 0, "vertical", player1.fleet[0], player1)
// gameboard.receiveAttack(0, 0, player1)

gameboard.printBoard(player1)
gameboard.printBoard(player2);

console.log(player1.fleet)
console.log(player2.fleet);

console.log(player1.name)
console.log(player2.name)

let x = gameboard.checkFleet(player2.fleet);
console.log(x);

let shipNames = ["carrier", "battleship", "destroyer", "submarine", "patrolboat"];

for (var i = 0; i < player1.fleet.length; i++) {
  gameboard.printBoard(player1);
  console.log(`At what coordinates will you place your ${shipNames[i]} ${player1.name}?`);
  let x = parseInt(readline.question(`At which X coordinate shall the ${shipNames[i]} be placed ${player1.name}? \n`));
  let y = parseInt(readline.question(`At which Y coordinate shall the ${shipNames[i]} be placed ${player1.name}? \n`));
  let direction = readline.question(`Shall the ship be placed vertically or horizontally ${player1.name}? horizontal / vertical \n`);
  let result = gameboard.receiveShip(x, y, direction, player1.fleet[i], player1);
    if (result === "You can't place your ship there Admiral!" || result === "A ship already occupies this space Admiral!") {
        console.log(result)
        i--
      }
  };
for (var i = 0; i < player2.fleet.length; i++) {
  let x = Math.floor(Math.random() * 9) + 1;
  let y = Math.floor(Math.random() * 9) + 1;
  let direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
  let result = gameboard.receiveShip(x, y, direction, player2.fleet[i], player2)
    if (result === "You can't place your ship there Admiral!" || result === "A ship already occupies this space Admiral!") {
        i--;
    }
}
gameboard.printBoard(player2)

console.log(`${player1.name}, it is time to attack!`);

let isPlayer1Turn = true;

const sendShot = () => {
  let x = parseInt(readline.question(`At which X coordinate shall we send our shot ${player1.name}? \n`));
  let y = parseInt(readline.question(`And at which Y coordinate Admiral? \n`));

  if (player2.board[x][y] === 'X') {
    console.log("You've already fired a shot there Admiral! Let's try again...");
    let result = sendShot()
    return result
  }
  return [x, y]
};

const computerSendShot = () => {
  let a = Math.floor(Math.random() * 9) + 1;
  let b = Math.floor(Math.random() * 9) + 1;

    if (player1.board[a][b] === 'X') {
    let result = computerSendShot()
    return result
  }
  return [a, b]
}


while (isPlayer1Turn) {
  gameboard.printBoard(player2);
  let shotCoords = sendShot()
  let result = gameboard.receiveAttack(shotCoords[0], shotCoords[1], player2);
  console.log(result)
  if (result === "The fleet has been destroyed!") {
    console.log(`The enemy fleet has been destroyed ${player1.name}! Victory is ours!`)
    break
  }
  let computerShotCoords = computerSendShot()
  let outcome = gameboard.receiveAttack(computerShotCoords[0], computerShotCoords[1], player1);
    if (outcome === "Direct hit!") {
      console.log("We've taken a hit Admiral!")
    }
    if (outcome === "Miss!") {
      console.log("The enemy have missed us!")
    }
    if (outcome === "The fleet has been destroyed!") {
      console.log(`We have been defeated ${player1.name}...`);
      break
    }
} 

console.log("Game over");


// module.exports = { ship, gameboard, ships };
