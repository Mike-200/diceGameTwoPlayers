const diceImage = [];
const displayScore = [];
const rollDiceButton = [];
const rolls = [];
const rollTheDiceText = [];
const holdButton = [];
const score = [];
const numberOfRolls = [];
const numberOfPlayers = 2;

for (let i = 1; i <= numberOfPlayers; i++) {
  diceImage[i] = document.getElementById(`diceImage${i}`);
  displayScore[i] = document.getElementById(`displayScore${i}`);
  rollDiceButton[i] = document.getElementById(`rollDiceButton${i}`);
  rolls[i] = document.getElementById(`rolls${i}`);
  rollTheDiceText[i] = document.getElementById(`rollTheDiceText${i}`);
  holdButton[i] = document.getElementById(`holdButton${i}`);
}
// set up the record score (minimum number fo rolls)
let minimumNumberOfRolls = 10; // the record score
const minRolls = document.getElementById("minRolls");

// update the screen with how many points required to win
const pointsToReach = 10;
const targetPoints = document.getElementById("targetPoints");
targetPoints.textContent = pointsToReach;

let playerNumber = 0;

const changePlayerNumber = () => {
  swapRollButton("Nothing");
  playerNumber++;
  if (playerNumber > numberOfPlayers) {
    playerNumber = 1;
  }
  swapRollButton("Roll");
};

const resetGame = () => {
  // choose a random player to start
  playerNumber = Math.ceil(Math.random() * 2);
  // set up the hold button for the current player only
  for (let i = 1; i <= numberOfPlayers; i++) {
    diceImage[i].src = "./images/dice3d.png";
    numberOfRolls[i] = 0;
    rolls[i].textContent = numberOfRolls[i];
    score[i] = 0;
    displayScore[i].textContent = score[i];
    changePlayerNumber();
    swapRollButton("Nothing");
  }
  swapRollButton("Roll");
};

const rollTheDice = () => {
  const diceRoll = Math.ceil(Math.random() * 6);
  numberOfRolls[playerNumber]++;
  setTimeout(() => {
    diceImage[playerNumber].style.animation = "none";
    diceImage[playerNumber].src = "./images/dice" + diceRoll + ".png";
    rolls[playerNumber].textContent = numberOfRolls[playerNumber];
    // check if a 1 has been rolled
    if (diceRoll === 1) {
      score[playerNumber] = 0;
      displayScore[playerNumber].textContent = score[playerNumber];
      changePlayerNumber();
    } else {
      score[playerNumber] += diceRoll;
      displayScore[playerNumber].textContent = score[playerNumber];
      // check for a winner
      if (score[playerNumber] > pointsToReach) {
        checkIfRecordSet();
        swapRollButton("Start");
      }
    }
  }, 0); // Math.round(Math.random() * 3000) + 1000);
  diceImage[playerNumber].src = "./images/dice3d.png";
  diceImage[playerNumber].style.animation = "jump-shaking 0.83s infinite";
};

const checkIfRecordSet = () => {
  if (numberOfRolls[playerNumber] < minimumNumberOfRolls) {
    minimumNumberOfRolls = numberOfRolls[playerNumber];
    minRolls.textContent = minimumNumberOfRolls;
    rollTheDiceText[playerNumber].textContent = "NEW RECORD !";
    swapRollButton("Start");
  } else {
    rollTheDiceText[playerNumber].textContent = "YOU WIN !";
  }
};

const swapRollButton = (buttonFunctionality) => {
  rollDiceButton[playerNumber].textContent = buttonFunctionality;
  rollTheDiceText[playerNumber].style.opacity = 0;
  if (buttonFunctionality === "Roll") {
    rollDiceButton[playerNumber].style.display = "block";
    rollDiceButton[playerNumber].style.opacity = 1;
    holdButton[playerNumber].style.display = "block";
    holdButton[playerNumber].style.opacity = 1;
    rollDiceButton[playerNumber].removeEventListener("click", resetGame);
    rollDiceButton[playerNumber].addEventListener("click", rollTheDice);
    holdButton[playerNumber].addEventListener("click", changePlayerNumber);
  } else if (buttonFunctionality === "Nothing") {
    rollDiceButton[playerNumber].style.display = "block";
    rollDiceButton[playerNumber].style.opacity = 0;
    holdButton[playerNumber].style.display = "block";
    holdButton[playerNumber].style.opacity = 0;
    rollDiceButton[playerNumber].removeEventListener("click", resetGame);
    rollDiceButton[playerNumber].removeEventListener("click", rollTheDice);
    holdButton[playerNumber].removeEventListener("click", changePlayerNumber);
  } else if (buttonFunctionality === "Start") {
    for (let i = 1; i <= numberOfPlayers; i++) {
      rollDiceButton[i].style.display = "block";
      rollDiceButton[i].style.opacity = 0;
      holdButton[i].style.display = "none";
      holdButton[i].style.opacity = 0;
      rollDiceButton[i].removeEventListener("click", rollTheDice);
      holdButton[i].removeEventListener("click", changePlayerNumber);
    }
    rollTheDiceText[playerNumber].style.opacity = 1;
    rollDiceButton[playerNumber].style.opacity = 1;
    rollDiceButton[playerNumber].addEventListener("click", resetGame);
  }
};

resetGame();
