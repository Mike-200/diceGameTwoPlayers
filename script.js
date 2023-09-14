// connect to html id's, classes, etc
const diceImage1 = document.getElementById("diceImage1");
const diceImage2 = document.getElementById("diceImage2");

const displayScore1 = document.getElementById("displayScore1");
const displayScore2 = document.getElementById("displayScore2");

const rollDiceButton1 = document.getElementById("rollDiceButton1");
const rollDiceButton2 = document.getElementById("rollDiceButton2");

const rolls1 = document.getElementById("rolls1");
const rolls2 = document.getElementById("rolls2");

const minRolls = document.getElementById("minRolls");
const rollTheDiceButton = document.getElementById("rollTheDiceButton");
const rollTheDiceText = document.getElementById("rollTheDiceText");
const holdButton = document.getElementById("holdButton");
const targetPoints = document.getElementById("targetPoints");

const numberOfPlayers = 1;
const pointsToReach = 20;
let score = [];
let numberOfRolls = 0;
let minimumNumberOfRolls = 10;
let playerNumber = 1;
// let playerNumber = Math.ceil(Math.random() * 2);

targetPoints.textContent = pointsToReach;

const holdButtonPressed = () => {
  console.log("hold button pressed");
  // store the score
  // pass control to the other player
  playerNumber++;
  if (playerNumber > numberOfPlayers) {
    playerNumber = 1;
  }
};

holdButton.addEventListener("click", holdButtonPressed);

const resetGame = () => {
  score[playerNumber] = 0;
  displayScore1.textContent = score[playerNumber];
    displayScore2.textContent = score[playerNumber];

  numberOfRolls = 0;
  rolls1.textContent = numberOfRolls;
    rolls2.textContent = numberOfRolls;

  diceImage1.src = "./images/dice3d.png";
  diceImage2.src = "./images/dice3d.png";

  swapRollButton("Roll");
};

const rollTheDice = () => {
  setTimeout(() => {
    diceImage1.style.animation = "none";
    diceImage2.style.animation = "none";

    numberOfRolls++;
    rolls1.textContent = numberOfRolls;
        rolls2.textContent = numberOfRolls;

    // generate a random number 1 to 6
    const diceRoll = Math.ceil(Math.random() * 6);
    diceImage1.src = "./images/dice" + diceRoll + ".png";
    diceImage2.src = "./images/dice" + diceRoll + ".png";

    // check if a 1 has been rolled
    if (diceRoll === 1) {
      swapRollButton("Play again");
    } else {
      score[playerNumber] += diceRoll;
      displayScore1.textContent = score[playerNumber];
            displayScore2.textContent = score[playerNumber];

      if (score[playerNumber] > pointsToReach) {
        checkIfRecordSet();
      }
    }
  }, Math.round(Math.random() * 3000) + 1000);
  diceImage1.src = "./images/dice3d.png";
  diceImage2.src = "./images/dice3d.png";

  diceImage1.style.animation = "jump-shaking 0.83s infinite";
  diceImage2.style.animation = "jump-shaking 0.83s infinite";
};

const checkIfRecordSet = () => {
  if (numberOfRolls < minimumNumberOfRolls) {
    rollTheDiceText.textContent = "NEW RECORD SET - WELL DONE !";
    minimumNumberOfRolls = numberOfRolls;
    minRolls.textContent = minimumNumberOfRolls;
    setTimeout(() => {
      swapRollButton("Play again");
    }, 3000);
  } else {
    swapRollButton("Play again");
  }
};

// this funtions will need splitting
const swapRollButton = (buttonFunctionality) => {
  rollDiceButton1.textContent = buttonFunctionality;
  if (buttonFunctionality === "Roll") {
    rollTheDiceText.style.opacity = 0;
    rollDiceButton1.removeEventListener("click", resetGame);
    rollDiceButton1.addEventListener("click", rollTheDice);
  } else if (buttonFunctionality === "Play again") {
    rollTheDiceText.textContent = "GAME OVER !";
    rollDiceButton1.removeEventListener("click", rollTheDice);
    rollDiceButton1.addEventListener("click", resetGame);
  }
};

resetGame();
