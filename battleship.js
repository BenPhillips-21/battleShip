// Factory function to create ship objects
const ship = (length, hitsTaken, sunken, shipId) => ({
  length,          // Length of the ship
  hitsTaken,       // Number of hits taken by the ship
  sunken,          // Flag indicating if the ship is sunken
  shipId,          // Unique identifier for the ship
  hit: function () {
    // Method to record a hit on the ship and return the updated hitsTaken count
    this.hitsTaken += 1;
    return this.hitsTaken;
  },
  isSunk: function () {
    // Method to check if the ship is sunken based on hitsTaken and length
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
// Method to handle receiving an attack on the player's gameboard
receiveAttack: function (coordX, coordY, player) {
  // Check if the selected cell contains a ship (value greater than 0)
  if (player.board[coordX][coordY] > 0) {
    // Loop through the player's fleet to find the corresponding ship
    for (var i = 0; i < player.fleet.length; i++) {
      // If the shipId matches the value on the board, it's the hit ship
      if (player.board[coordX][coordY] === player.fleet[i].shipId) {
        // Register the hit on the ship and check if it's sunk
        player.fleet[i].hit();
        player.fleet[i].isSunk();
        
        // Mark the cell as a hit on the player's gameboard
        player.board[coordX][coordY] = "H";

        // Update the corresponding cell in the DOM with visual feedback
        let lePlayer = player.name.toLowerCase();
        const cellId = `${lePlayer}Board-${coordX}-${coordY}`;
        const cell = document.getElementById(cellId);
        cell.style.backgroundColor = 'red';
        cell.textContent = 'X';

        // Check if the entire fleet is destroyed or return a direct hit message
        let result = gameboard.checkFleet(player.fleet);
        if (result === "The fleet has been destroyed!") {
          return result;
        } else {
          return "Direct hit!";
        }
      }
    }
  } else {
    // If the cell doesn't contain a ship, mark it as a miss on the player's gameboard
    player.board[coordX][coordY] = "M";

    // Update the corresponding cell in the DOM with visual feedback for a miss
    let thePlayer = player.name.toLowerCase();
    const cellId = `${thePlayer}Board-${coordX}-${coordY}`;
    const cell = document.getElementById(cellId);
    cell.style.backgroundColor = 'green';

    // Return a miss message
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

const player1 = createPlayer("player", leFleet1);
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

let shipsPlaced = false
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
        if (shipsPlaced === false) {
        handleCellEvent(event.target, '#0C2D48', direction, currentShipLength, boardId);
        } 
        else if (boardId === 'playerBoard') {
        }
        else {
          if (boardId === 'computerBoard') {
          let cell = event.target
          if (cell.style.backgroundColor === 'green' || cell.style.backgroundColor === 'red') {
          } else {          
          cell.style.backgroundColor = 'yellow';
          }
          } 
        }
      });

cell.addEventListener('mouseout', function() {
    let [x, y] = event.target.id.split('-').slice(1).map(Number);
    
    if (boardId === 'playerBoard') {
        if (shipsPlaced === true) {

        }
        else if (player1.board[x][y] > 0) {
            handleCellEvent(event.target, '#0C2D48', direction, 1, boardId);
        } else {
            handleCellEvent(event.target, '#ededed', direction, currentShipLength, boardId);
        }
    } else {
         if (player1.board[x][y] > 0) {
            let cell = event.target;
            if (cell.style.backgroundColor === 'green' || cell.style.backgroundColor === 'red') {
                // Do nothing if the color is green or red
            } else {
                cell.style.backgroundColor = '#ededed';
            }
        } else {
            let cell = event.target;
            switch (cell.style.backgroundColor) {
                case 'red':
                    cell.style.backgroundColor = 'red';
                    cell.textContent = 'X';
                    break;
                case 'green':
                    cell.style.backgroundColor = 'green';
                    break;
                default:
                    cell.style.backgroundColor = '#ededed';
                    break;
            }
        }
    }
});


      board.appendChild(cell);
    }
  }
}

generateBoard("playerBoard")
generateBoard("computerBoard")

function handleCellEvent(event, backgroundColor, direction, shipLength, board) {
    let [x, y] = event.id.split('-').slice(1).map(Number);
    if (player1.board[x][y] > 0) {
      return
    }
    if (direction === 'vertical') {
      for (let j = 0; j < shipLength-1; j++) {
        x++
        if (player1.board[x][y] > 0) {
        return       
        }
      }
    }
    if (direction === 'horizontal') {
      for (let t = 0; t < shipLength-1; t++) {
        y++
        if (player1.board[x][y] > 0 || player1.board[x][y] === undefined) {
        return       
        }
    }
  }
    let cell = event
    cell.classList.add('ship');
    cell.style.backgroundColor = backgroundColor;
    let [a, b] = event.id.split('-').slice(1).map(Number);
    for (var i = 0; i < shipLength; i++) {
      if (board === 'playerBoard') {
      const currentCellId = `playerBoard-${a}-${b}`;
      const currentCell = document.getElementById(currentCellId);
        // if (currentCell === null) {
        //   return
        // }
      currentCell.style.backgroundColor = backgroundColor;
      if (direction === 'horizontal') {
        b++;
    } else if (direction === 'vertical') {
        a++;
    }
    }
  }
  }

function handleCellClick(boardId) {
  return new Promise(resolve => {
    const board = document.getElementById(boardId);

    function clickHandler(event) {
      const cellId = event.target.id;
      resolve(cellId);
    }

    board.addEventListener("click", clickHandler);
  });
}

// Asynchronously place ships on the player's board
async function placeShips() {
  // Loop through the player's fleet
  for (var i = 0; i < player1.fleet.length; i++) {
    // Get the length of the current ship
    currentShipLength = player1.fleet[i].length;
    // Display ship placement instructions
    var heading = document.getElementById("hiddenHeading");
    heading.style.display = "block";
    heading.textContent = `Admiral, select where you shall place your ${shipNames[i]}.`;
    // Set up a button to rotate the ship
    const button = document.getElementById("rotateButton")
    button.onclick = function() {
      handleButtonClick()
    }
    // Handle ship rotation on button click
    function handleButtonClick() {
      direction = direction === 'horizontal' ? 'vertical' : 'horizontal';
    };
    // Wait for the player to click on a cell to place the ship
    let coords = await handleCellClick("playerBoard");
    // Extract x and y coordinates from the clicked cell
    let [x, y] = coords.split('-').slice(1).map(Number);
    // Attempt to place the ship on the gameboard
    let result = gameboard.receiveShip(x, y, direction, player1.fleet[i], player1);
    // Display an alert if ship placement is invalid and decrement the loop counter
    if (result === "You can't place your ship there Admiral!" || result === "A ship already occupies this space Admiral!") {
      alert(`${result}`)
      i--;
    }
  }

  for (var i = 0; i < player2.fleet.length; i++) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let direction = Math.random() < 0.5 ? "horizontal" : "vertical";
    let result = gameboard.receiveShip(x, y, direction, player2.fleet[i], player2);
    if (result === "You can't place your ship there Admiral!" || result === "A ship already occupies this space Admiral!") {
      i--;
    }
  }
}

let isPlayer1Turn = true;

async function gameLoop() {
  await placeShips();
  var rotate = document.getElementById("rotateButton");
  rotate.style.display = "none";
  shipsPlaced = true
  var heading = document.getElementById("hiddenHeading");
  heading.textContent = "Fire at will!";
  gameboard.printBoard(player2);
    while (isPlayer1Turn === true) {
      let validatedCoords = await sendShot()
        heading.textContent = "";
      let result = gameboard.receiveAttack(validatedCoords[0], validatedCoords[1], player2);
      if (result === "The fleet has been destroyed!") {
          heading.textContent = "The enemy fleet has been destroyed! Victory is ours!"
          var play = document.getElementById("playButton");
          play.style.display = "block";
          return;
        }
        let computerShotCoords = computerSendShot();
        console.log(computerShotCoords)
        let outcome = gameboard.receiveAttack(
          computerShotCoords[0],
          computerShotCoords[1],
          player1
        );
        gameboard.printBoard(player1);
        if (outcome === "The fleet has been destroyed!") {
          heading.textContent = "We have been defeated Admiral..."
          console.log(`We have been defeated ${player1.name}...`);
          var play = document.getElementById("playButton");
          play.style.display = "block";
          return;
        }
    }
  heading.textContent = "Game Over!"
}
gameLoop();

document.getElementById('playButton').addEventListener('click', function() {
    location.reload();
});


// Asynchronously handle sending a shot to the computer's gameboard
async function sendShot() {
  // Wait for the player to click on a cell on the computer's gameboard
  let rawCoords = await handleCellClick("computerBoard");

  // Extract x and y coordinates from the clicked cell
  let [x, y] = rawCoords.split('-').slice(1).map(Number);
  // Check for valid coordinates
  if (isNaN(x) || isNaN(y)) {
    console.log("Please enter valid coordinates");
    // Recursive call to prompt the player to enter valid coordinates
    return sendShot();
  } else if (x < 0 || x > 9 || y < 0 || y > 9) {
    console.log("Please enter coordinates within the valid range (0-9)!");
    // Recursive call to prompt the player to enter coordinates within the valid range
    return sendShot();
  } else if (player2.board[x][y] === "M" || player2.board[x][y] === "H") {
    console.log("You've already fired a shot there Admiral! Let's try again...");
    // Recursive call to prompt the player to choose a different cell
    return sendShot();
  }
  // Return the valid coordinates for the shot
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
      }
    }
  }

  let a = Math.floor(Math.random() * 10);
  let b = Math.floor(Math.random() * 10);

  if (player1.board[a][b] === "M" || player1.board[a][b] === "H") {
    let result = computerSendShot();
    return result;
  }

  return [a, b];
};

// module.exports = { ship, gameboard, ships };
