"use strict";

let dice = document.querySelector(".dice");
let rollDiceButton = document.querySelector(".btn--roll");
let holdScoreButton = document.querySelector(".btn--hold");
let newGameButton = document.querySelector(".btn--new");
let player1 = document.querySelector(".player--0");
let player2 = document.querySelector(".player--1");
let player1CurScore = document.querySelector("#current--0");
let player2CurScore = document.querySelector("#current--1");
let player1TotScore = document.querySelector("#score--0");
let player2TotScore = document.querySelector("#score--1");
let curScore = 0;
let activePlayer = "player1";

function rollDice() {
  let diceRolled = generateDiceRoll();
  dice.setAttribute("src", `assets/dice-${diceRolled}.png`);
  diceRolled !== 1 ? updateCurrentScore(diceRolled) : switchPlayer();
}

function generateDiceRoll() {
  return Math.floor(Math.random() * 6 + 1);
}

function updateCurrentScore(diceRolled) {
  if (activePlayer === "player1") {
    curScore += diceRolled;
    player1CurScore.textContent = curScore;
  } else {
    curScore += diceRolled;
    player2CurScore.textContent = curScore;
  }
}

function switchPlayer() {
  if (activePlayer === "player1") {
    curScore = 0;
    player1CurScore.textContent = 0;
    player1.classList.remove("player--active");
    player2.classList.add("player--active");
    activePlayer = "player2";
  } else {
    curScore = 0;
    player2CurScore.textContent = 0;
    player2.classList.remove("player--active");
    player1.classList.add("player--active");
    activePlayer = "player1";
  }
}

function holdScore() {
  if (activePlayer === "player1") {
    let temp = Number(player1TotScore.textContent);
    temp += Number(player1CurScore.textContent);
    player1TotScore.textContent = temp;
    gameOver(temp, player1);
  } else {
    let temp = Number(player2TotScore.textContent);
    temp += Number(player2CurScore.textContent);
    player2TotScore.textContent = temp;
    gameOver(temp, player2);
  }
}

function gameOver(playerTotScore, player) {
  if (playerTotScore >= 100) {
    player.classList.add("player--winner");
    dice.classList.add("hidden");
    rollDiceButton.removeEventListener("click", rollDice);
    holdScoreButton.removeEventListener("click", holdScore);
  } else {
    switchPlayer();
  }
}

function resetGame() {
  curScore = 0;
  player1CurScore.textContent = 0;
  player2CurScore.textContent = 0;
  player1TotScore.textContent = 0;
  player2TotScore.textContent = 0;
  player1.classList.remove("player--winner");
  player2.classList.remove("player--active", "player--winner");
  player1.classList.add("player--active");
  activePlayer = "player1";
  dice.classList.remove("hidden");
  dice.setAttribute("src", "assets/dice-1.png");
  rollDiceButton.addEventListener("click", rollDice);
  holdScoreButton.addEventListener("click", holdScore);
}

rollDiceButton.addEventListener("click", rollDice);
holdScoreButton.addEventListener("click", holdScore);
newGameButton.addEventListener("click", resetGame);
