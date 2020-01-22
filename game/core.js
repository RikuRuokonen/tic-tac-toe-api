const texts = require('../resources/texts.json');
// We store game as 2-D array. Normally this would of course be in database
// We use 0 to indicate empty, 1 to indicate player 1(Human) and 2 to indicate player 2(Computer)
const Board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let totalMoves = 0;
let gameStarted = false;
let computerMark = texts.oMark;
let playerMark = texts.xMark;
// 1 = Human, 2 = computer
let winner = null;

// Setters & Getters
const setWinner = (whoWon) => {
  winner = whoWon;
};

const getWinner = () => winner;

const gameIsDraw = () => totalMoves === 9;

const getBoard = () => Board;

const isGameStarted = () => gameStarted;

// core logic
const layoutTransformation = (board) => {
  const transformedArray = [];
  board.forEach((row) => {
    let rowItems = '';
    row.forEach((mark) => {
      if (mark === 1) {
        rowItems = rowItems.concat(playerMark);
      } else if (mark === 2) {
        rowItems = rowItems.concat(computerMark);
      } else {
        rowItems = rowItems.concat('-');
      }
    });
    transformedArray.push(rowItems);
  });
  return transformedArray;
};


const setupGame = (responseCallback, simulateComputerMove) => {
  if (gameStarted !== true) {
    gameStarted = true;
    const startingPlayer = Math.round(Math.random()) + 1;
    if (startingPlayer === 1) {
      responseCallback(200, {
        message: texts.playerStarts, layout: layoutTransformation(Board), updatedBoard: Board,
      });
      computerMark = texts.oMark;
      playerMark = texts.xMark;
    } else {
      computerMark = texts.xMark;
      playerMark = texts.oMark;
      simulateComputerMove(responseCallback, texts.computerStarts);
    }
  } else {
    responseCallback(500, { message: texts.gameOngoing });
  }
};

const makeMove = (move) => {
  const { row, column } = move;
  totalMoves += 1;
  Board[row][column] = Number(move.playerNumber);
  return Board;
};

const resetBoard = () => {
  Board.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      Board[rowIndex][columnIndex] = 0;
    });
  });
};

const endGame = () => {
  totalMoves = 0;
  gameStarted = false;
};

const resetGame = (responseCallback, simulateComputerMove) => {
  if (gameStarted !== true) {
    responseCallback(500, { message: texts.noGameToReset });
  } else {
    endGame();
    resetBoard();
    setupGame(responseCallback, simulateComputerMove);
  }
};

module.exports = {
  Board,
  getBoard,
  makeMove,
  setupGame,
  resetGame,
  layoutTransformation,
  isGameStarted,
  endGame,
  setWinner,
  gameIsDraw,
  getWinner,
};
