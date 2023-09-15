import { htmlCode } from "./htmlCode/newPlayerHTML.js";

const diceImage = [];
const displayScore = [];
const rollDiceButton = [];
const rolls = [];
const rollTheDiceText = [];
const holdButton = [];
//const selectNumberOfPlayers = document.getElementById("selectNumberOfPlayers");
let numberOfPlayers = 6;

const changeNumberOfPlayers = () => {};

const selectNumberOfPlayers = document.querySelectorAll(
  "#selectNumberOfPlayers button"
);

// set up the listeners on the number of player buttons
for (let i = 0; i < 6; i++) {
  selectNumberOfPlayers[i].addEventListener("click", () => {
    numberOfPlayers = selectNumberOfPlayers[i].textContent;
    gameTitlePlayers.textContent = numberOfPlayers;
    players.innerHTML = "";
    for (let i = 1; i <= numberOfPlayers; i++) {
      players.innerHTML += htmlCode;
    }
    resetGame();
  });
}

const gameTitlePlayers = document.getElementById("gameTitlePlayers");
gameTitlePlayers.textContent = numberOfPlayers;

const players = document.getElementById("playersSideBySide"); // the container of each player
const player = []; // the individual players inside the container players
const score = [];
const numberOfRolls = [];

const setUpPlayerScreen = () => {
  // create the html code for the number of players
  // this needs creating first before all the elements can be accessed in the next loop
  players.innerHTML = "";
  for (let i = 1; i <= numberOfPlayers; i++) {
    players.innerHTML += htmlCode;
  }
  // read the html code from the file ./htmlCode/newPlaterHTML.txt
  // append this file as a child to the html code after id="playersSideBySide"
  // make the file dynamic so I can change all the 1's to the 2's, etc
  // just change 1 to ${i} and put the whole file in template literals ?

  // get the elements from the html code
  for (let i = 1; i <= numberOfPlayers; i++) {
    player[i] = document.getElementsByClassName("player")[i - 1];
    diceImage[i] = document.getElementsByClassName("diceImageDisplay")[i - 1];
    rolls[i] = document.getElementsByClassName("rolls")[i - 1];
    displayScore[i] = document.getElementsByClassName("displayScore")[i - 1];
    rollTheDiceText[i] =
      document.getElementsByClassName("rollTheDiceText")[i - 1];
    rollDiceButton[i] =
      document.getElementsByClassName("rollDiceButton")[i - 1];
    holdButton[i] = document.getElementsByClassName("holdButton")[i - 1];
  }
};
// set up the record score (minimum number of rolls)
let minimumNumberOfRolls = 10; // the record score
const minRolls = document.getElementById("minRolls");

// update the screen with how many points required to win
const pointsToReach = 20;
const targetPoints = document.getElementById("targetPoints");
targetPoints.textContent = pointsToReach;

let playerNumber;

const changePlayerNumber = () => {
  player[playerNumber].style.opacity = 0.75;
  interfaceNothing();
  playerNumber++;
  if (playerNumber > numberOfPlayers) {
    playerNumber = 1;
  }
  player[playerNumber].style.opacity = 1;
  interfaceRoll();
};

const resetGame = () => {
  setUpPlayerScreen();
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
    interfaceNothing();
  }
  interfaceRoll();
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
        interfaceStart();
      }
    }
  }, Math.round(Math.random() * 3000) + 1000);
  diceImage[playerNumber].src = "./images/dice3d.png";
  diceImage[playerNumber].style.animation = "jump-shaking 0.83s infinite";
};

const checkIfRecordSet = () => {
  if (numberOfRolls[playerNumber] < minimumNumberOfRolls) {
    minimumNumberOfRolls = numberOfRolls[playerNumber];
    minRolls.textContent = minimumNumberOfRolls;
    rollTheDiceText[playerNumber].textContent = "NEW RECORD !";
  } else {
    rollTheDiceText[playerNumber].textContent = "YOU WIN !";
  }
};

const interfaceRoll = () => {
  rollTheDiceText[playerNumber].style.opacity = 0;
  rollDiceButton[playerNumber].textContent = "Roll";
  rollDiceButton[playerNumber].style.display = "block";
  rollDiceButton[playerNumber].style.opacity = 1;
  holdButton[playerNumber].style.display = "block";
  holdButton[playerNumber].style.opacity = 1;
  rollDiceButton[playerNumber].removeEventListener("click", resetGame);
  rollDiceButton[playerNumber].addEventListener("click", rollTheDice);
  holdButton[playerNumber].addEventListener("click", changePlayerNumber);
};

const interfaceNothing = () => {
  rollTheDiceText[playerNumber].style.opacity = 0;
  rollDiceButton[playerNumber].style.display = "block";
  rollDiceButton[playerNumber].style.opacity = 0;
  holdButton[playerNumber].style.display = "block";
  holdButton[playerNumber].style.opacity = 0;
  rollDiceButton[playerNumber].removeEventListener("click", resetGame);
  rollDiceButton[playerNumber].removeEventListener("click", rollTheDice);
  holdButton[playerNumber].removeEventListener("click", changePlayerNumber);
};

const interfaceStart = () => {
  rollDiceButton[playerNumber].textContent = "Start";
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
};

resetGame();
