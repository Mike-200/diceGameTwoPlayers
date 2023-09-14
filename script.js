// connect to html id's, classes, etc
const diceImage = [];
diceImage[1] = document.getElementById("diceImage1");
diceImage[2] = document.getElementById("diceImage2");

const displayScore = [];
displayScore[1] = document.getElementById("displayScore1");
displayScore[2] = document.getElementById("displayScore2");

const rollDiceButton = [];
rollDiceButton[1] = document.getElementById("rollDiceButton1");
rollDiceButton[2] = document.getElementById("rollDiceButton2");

const rolls = [];
rolls[1] = document.getElementById("rolls1");
rolls[2] = document.getElementById("rolls2");

const rollTheDiceText = [];
rollTheDiceText[1] = document.getElementById("rollTheDiceText1");
rollTheDiceText[2] = document.getElementById("rollTheDiceText2");

const holdButton = [];
holdButton[1] = document.getElementById("holdButton1");
holdButton[2] = document.getElementById("holdButton2");

const minRolls = document.getElementById("minRolls");
const targetPoints = document.getElementById("targetPoints");

const numberOfPlayers = 1;
const pointsToReach = 20;
let score = [];
let numberOfRolls = [];
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

holdButton[1].addEventListener("click", holdButtonPressed);
holdButton[2].addEventListener("click", holdButtonPressed);

const resetGame = () => {
  score[playerNumber] = 0;
  displayScore[1].textContent = score[playerNumber];
  displayScore[2].textContent = score[playerNumber];

  numberOfRolls[playerNumber] = 0;
  rolls[1].textContent = numberOfRolls[playerNumber];
  rolls[2].textContent = numberOfRolls[playerNumber];

  diceImage[1].src = "./images/dice3d.png";
  diceImage2.src = "./images/dice3d.png";

  swapRollButton("Roll");
};

const rollTheDice = () => {
  //const diceImage = eval(`diceImage${playerNumber}`);
  // generate a random number 1 to 6
  const diceRoll = Math.ceil(Math.random() * 6);
  //const rolls = eval(`rolls${playerNumber}`);
  numberOfRolls[playerNumber]++;

  setTimeout(() => {
    //let diceImage = JSON.parse("diceImage1");
    //console.log(typeof diceImage);
    //console.log(typeof diceImage1);
    diceImage[1].style.animation = "none";
    diceImage[1].src = "./images/dice" + diceRoll + ".png";
    rolls[1].textContent = numberOfRolls[playerNumber];
    //diceImage2.style.animation = "none";

    //rolls2.textContent = numberOfRolls[playerNumber];

    //diceImage2.src = "./images/dice" + diceRoll + ".png";

    // check if a 1 has been rolled
    if (diceRoll === 1) {
      swapRollButton("Play again");
    } else {
      score[playerNumber] += diceRoll;
      displayScore[1].textContent = score[playerNumber];
      displayScore[2].textContent = score[playerNumber];

      if (score[playerNumber] > pointsToReach) {
        checkIfRecordSet();
      }
    }
  }, 0); // Math.round(Math.random() * 3000) + 1000);
  diceImage[1].src = "./images/dice3d.png";
  //diceImage2.src = "./images/dice3d.png";

  diceImage[1].style.animation = "jump-shaking 0.83s infinite";
  //diceImage2.style.animation = "jump-shaking 0.83s infinite";
};

const checkIfRecordSet = () => {
  if (numberOfRolls[playerNumber] < minimumNumberOfRolls) {
    rollTheDiceText[1].textContent = "NEW RECORD SET - WELL DONE !";
    rollTheDiceText[2].textContent = "NEW RECORD SET - WELL DONE !";

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
  rollDiceButton1.textContent = buttonFunctionality;
  if (buttonFunctionality === "Roll") {
    rollTheDiceText[1].style.opacity = 0;
    rollTheDiceText[2].style.opacity = 0;

    rollDiceButton[1].removeEventListener("click", resetGame);
    rollDiceButton[2].removeEventListener("click", resetGame);

    rollDiceButton[1].addEventListener("click", rollTheDice);
    rollDiceButton[2].addEventListener("click", rollTheDice);
  } else if (buttonFunctionality === "Play again") {
    rollTheDiceText[1].textContent = "GAME OVER !";
    rollTheDiceText[2].textContent = "GAME OVER !";

    rollDiceButton[1].removeEventListener("click", rollTheDice);
    rollDiceButton[2].removeEventListener("click", rollTheDice);

    rollDiceButton[1].addEventListener("click", resetGame);
    rollDiceButton[2].addEventListener("click", resetGame);
  }
};

resetGame();
