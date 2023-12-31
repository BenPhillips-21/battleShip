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
          if (player.name === "Computer") {
            const cellId = `computerBoard-${coordX-1}-${coordY}`;
            const cell = document.getElementById(cellId);
            cell.classList.add('ship');
          } else {
            const cellId = `playerBoard-${coordX-1}-${coordY}`;
            const cell = document.getElementById(cellId);
            cell.classList.add('ship');
          }      
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
        if (player.name === "Computer") {
          const cellId = `computerBoard-${coordX}-${coordY-1}`;
          const cell = document.getElementById(cellId);
          cell.classList.add('ship');
        } else {
          const cellId = `playerBoard-${coordX}-${coordY-1}`;
          const cell = document.getElementById(cellId);
          cell.classList.add('ship');
        }
        t++;
      }
    }
  },
checkFleet: function(playerFleet) {
  let fleetSunkenStatus = [];
  for (var i = 0; i < playerFleet.length; i++) {
    fleetSunkenStatus.push(playerFleet[i].sunken);
  }

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
          player.board[coordX][coordY] = "H";
          let result = gameboard.checkFleet(player.fleet);
          if (result === "The fleet has been destroyed!") {
            return result;
          } else {
            return "Direct hit!";
          }
        }
      }
    } else {
      player.board[coordX][coordY] = "M";
      return "Miss!";
    }
  },
};
const createPlayer = (name, fleet) => {
  return {
    name,
    fleet,
    board: [...gameboard.leBoard.map((row) => [...row])],
  };
};

const carrier1 = ship(5, 0, false, 5);
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

gameboard.printBoard(player1);
gameboard.printBoard(player2);

let x = gameboard.checkFleet(player2.fleet);

let shipNames = [
  "carrier",
  "battleship",
  "destroyer",
  "submarine",
  "patrolboat",
];

let direction = 'horizontal'
let currentShipLength = player1.fleet[0].length

function generateBoard(boardId) {
  const board = document.getElementById(boardId);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `${boardId}-${i}-${j}`;

      // Add click event handler
      cell.onclick = function () {
        handleCellClick(cell.id);
      };

      cell.addEventListener('mouseover', function() {
        handleCellEvent(event.target, 'navy', direction, currentShipLength);
      });

      cell.addEventListener('mouseout', function() {
        // if there's a ship on the spot ... dont change colour
        let [x, y] = event.target.id.split('-').slice(1).map(Number);
        if (player1.board[x][y] > 0) {
          // do nothing
        } else {
          handleCellEvent(event.target, '#ededed', direction, currentShipLength);
        }
      });

      board.appendChild(cell);
    }
  }
}

generateBoard("playerBoard")
generateBoard("computerBoard")

function handleCellEvent(event, backgroundColor, direction, shipLength) {
    let cell = event
    cell.classList.add('ship');
    cell.style.backgroundColor = backgroundColor;

    let [x, y] = cell.id.split('-').slice(1).map(Number);

    for (var i = 0; i < shipLength; i++) {
      console.log(shipLength)
      const cellId = `playerBoard-${x}-${y}`;
      const cell = document.getElementById(cellId);
      cell.style.backgroundColor = backgroundColor;
      if (direction === 'horizontal') {
        y++;
    } else if (direction === 'vertical') {
        x++;
    }
    }
  }

function handleCellClick() {
  return new Promise(resolve => {
    const board = document.getElementById("playerBoard");

    function clickHandler(event) {
      const cellId = event.target.id;
      resolve(cellId);
    }

    board.addEventListener("click", clickHandler);
  });
}

async function placeShips() {
  for (var i = 0; i < player1.fleet.length; i++) {
    currentShipLength = player1.fleet[i].length;
    var heading = document.getElementById("hiddenHeading");
    heading.style.display = "block";
    heading.textContent = `Select where you shall place the ${shipNames[i]} ${player1.name}`;

    const button = document.getElementById("rotateButton")
    button.onclick = function() {
      handleButtonClick()
    }

    function handleButtonClick() {
      direction = direction === 'horizontal' ? 'vertical' : 'horizontal';
      };

    let coords = await handleCellClick();

    // Extract x and y from coords
    let [x, y] = coords.split('-').slice(1).map(Number);

    let result = gameboard.receiveShip(x, y, direction, player1.fleet[i], player1);
    gameboard.printBoard(player1);
    if (result === "You can't place your ship there Admiral!" || result === "A ship already occupies this space Admiral!") {
      i--;
    }
    
}

  

  for (var i = 0; i < player2.fleet.length; i++) {
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    let direction = Math.random() < 0.5 ? "horizontal" : "vertical";
    let result = gameboard.receiveShip(x, y, direction, player2.fleet[i], player2);
    if (result === "You can't place your ship there Admiral!" || result === "A ship already occupies this space Admiral!") {
      i--;
    }
  }
}

async function gameLoop() {
  await placeShips();
  gameboard.printBoard(player2);
}
gameLoop();

let isPlayer1Turn = true;

const sendShot = () => {
  let x = parseInt(
    readline.question(
      `At which X coordinate shall we send our shot ${player1.name}? \n`
    )
  );
  let y = parseInt(readline.question(`And at which Y coordinate Admiral? \n`));

  if (isNaN(x) || isNaN(y)) {
    console.log("Please enter valid coordinates")
    return sendShot();
  }

  if (x < 0 || x > 9 || y < 0 || y > 9) {
    console.log("Please enter coordinates within the valid range (0-9)!");
    return sendShot();
  }

  if (player2.board[x][y] === "M" || player2.board[x][y] === "H") {
    console.log("You've already fired a shot there Admiral! Let's try again...");
    return sendShot();
  }
  return [x, y];
};

const checkIfLegal = (x, y) => {
  if (!player1.board[x] || !player1.board[x][y]) {
    return "Illegal";
  }
  if (player1.board[x][y] === "M" || player1.board[x][y] === "H") {
    return "Illegal";
  }
  if (x > 9 || y > 9) {
    return "Illegal";
  }
  return "Legal";
};

const computerSendShot = () => {
  console.log(player1.board);
  for (let i = 0; i < player1.board.length; i++) {
    for (let j = 0; j < player1.board[i].length; j++) {
      if (player1.board[i][j] === "H") {
        let a = i;
        a++;
        let b = i;
        b--;
        let c = j;
        c++;
        let d = j;
        d--;

        let r1 = checkIfLegal(a, j);
        if (r1 === "Legal") {
          return [a, j];
        }

        let r2 = checkIfLegal(b, j);
        if (r2 === "Legal") {
          return [b, j];
        }

        let r3 = checkIfLegal(i, c);
        if (r3 === "Legal") {
          return [i, c];
        }

        let r4 = checkIfLegal(i, d);
        if (r4 === "Legal") {
          return [i, d];
        }
        // if all moves are illegal, then do a random shot LOL
      }
    }
  }

  let a = Math.floor(Math.random() * 9);
  let b = Math.floor(Math.random() * 9);

  if (player1.board[a][b] === "M" || player1.board[a][b] === "H") {
    let result = computerSendShot();
    return result;
  }

  return [a, b];
};

function initializeGame() {
  gameboard.printBoard(player2);
  let shotCoords = sendShot();
  let result = gameboard.receiveAttack(shotCoords[0], shotCoords[1], player2);
  console.log(result);
  if (result === "The fleet has been destroyed!") {
    console.log(
      `The enemy fleet has been destroyed ${player1.name}! Victory is ours!`
    );
    return;
  }
  let computerShotCoords = computerSendShot();
  let outcome = gameboard.receiveAttack(
    computerShotCoords[0],
    computerShotCoords[1],
    player1
  );
  gameboard.printBoard(player1);
  if (outcome === "Direct hit!") {
    console.log("We've taken a hit Admiral!");
  }
  if (outcome === "Miss!") {
    console.log("The enemy have missed us!");
  }
  if (outcome === "The fleet has been destroyed!") {
    console.log("Our fleet has been destroyed!");
    console.log(`We have been defeated ${player1.name}...`);
    return;
  }
}

initializeGame();
console.log("Game over");

// module.exports = { ship, gameboard, ships };
