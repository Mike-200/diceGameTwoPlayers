const diceImage = [];
const displayScore = [];
const rollDiceButton = [];
const rolls = [];
const rollTheDiceText = [];
const holdButton = [];

const numberOfPlayers = 2;

for (let i = 1; i <= numberOfPlayers; i++) {
  diceImage[i] = document.getElementById(`diceImage${i}`);
  displayScore[i] = document.getElementById(`displayScore${i}`);
  rollDiceButton[i] = document.getElementById(`rollDiceButton${i}`);
  rolls[i] = document.getElementById(`rolls${i}`);
  rollTheDiceText[i] = document.getElementById(`rollTheDiceText${i}`);
  holdButton[i] = document.getElementById(`holdButton${i}`);
}

const minRolls = document.getElementById("minRolls");

const pointsToReach = 20;
const targetPoints = document.getElementById("targetPoints");
targetPoints.textContent = pointsToReach;

let minimumNumberOfRolls = 10;
let score = [];
let numberOfRolls = [];
let playerNumber = 1;
// let playerNumber = Math.ceil(Math.random() * 2);

const holdButtonPressed = () => {
  console.log(`hold button for player ${playerNumber} pressed`);
  // store the score
  // pass control to the other player
  changePlayerNumber();
};
holdButton[1].addEventListener("click", holdButtonPressed);
holdButton[2].addEventListener("click", holdButtonPressed);

const changePlayerNumber = () => {
  playerNumber++;
  if (playerNumber > numberOfPlayers) {
    playerNumber = 1;
  }
  //console.log(`player number ${playerNumber} is now in play`);
};

const resetGame = () => {
  for (let i = 1; i <= numberOfPlayers; i++) {
    diceImage[i].src = "./images/dice3d.png";
    numberOfRolls[i] = 0;
    rolls[i].textContent = numberOfRolls[playerNumber];
    score[i] = 0;
    displayScore[i].textContent = score[playerNumber];
  }
  for (let i = 1; i <= numberOfPlayers; i++) {
    changePlayerNumber();

    swapRollButton("Roll");
  }
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
      //swapRollButton("Play again");
      score[playerNumber] = 0;
      displayScore[playerNumber].textContent = score[playerNumber];

      changePlayerNumber();
    } else {
      score[playerNumber] += diceRoll;
      displayScore[playerNumber].textContent = score[playerNumber];
      // check for a winner
      if (score[playerNumber] > pointsToReach) {
        console.log(`player ${playerNumber} is the winner`);
        checkIfRecordSet();
        swapRollButton();
        //resetGame()
      }
    }
  }, 0); // Math.round(Math.random() * 3000) + 1000);
  diceImage[playerNumber].src = "./images/dice3d.png";
  //diceImage2.src = "./images/dice3d.png";

  diceImage[playerNumber].style.animation = "jump-shaking 0.83s infinite";
  //diceImage2.style.animation = "jump-shaking 0.83s infinite";
};

const checkIfRecordSet = () => {
  if (numberOfRolls[playerNumber] < minimumNumberOfRolls) {
    rollTheDiceText[playerNumber].textContent = "NEW RECORD SET - WELL DONE !";
    rollTheDiceText[playerNumber].style.opacity = 1;

    minimumNumberOfRolls = numberOfRolls[playerNumber];
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
  // Roll or Hold visible
  if (buttonFunctionality === "Roll") {
    rollDiceButton[playerNumber].textContent = buttonFunctionality;
    rollTheDiceText[playerNumber].style.opacity = 1;
    rollDiceButton[playerNumber].removeEventListener("click", resetGame);
    rollDiceButton[playerNumber].addEventListener("click", rollTheDice);
  } else if (buttonFunctionality === "Nothing Visible") {
    rollDiceButton[playerNumber].textContent = buttonFunctionality;
    rollTheDiceText[playerNumber].style.opacity = 1;
    rollDiceButton[playerNumber].removeEventListener("click", resetGame);
    rollDiceButton[playerNumber].removeEventListener("click", rollTheDice);
  } else if (buttonFunctionality === "Start New Game!") {
    rollDiceButton[playerNumber].textContent = buttonFunctionality;
    for (let i = 0; i < numberOfPlayers; i++) {
      rollTheDiceText[i].textContent = `PLAYER ${playerNumber} WINS !`;
      rollTheDiceText[playerNumber].style.opacity = 1;
      rollDiceButton[playerNumber].removeEventListener("click", resetGame);
      rollDiceButton[playerNumber].addEventListener("click", rollTheDice);
    }
  }
};
resetGame();
