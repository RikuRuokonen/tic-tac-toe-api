const {
  getBoardByColumns,
  moveIsValid,
  checkRows,
  checkColumns,
  checkDiagonalRows,
} = require('../utils/helpers');
const {
  Board,
  makeMove,
  layoutTransformation,
  setWinner,
  gameIsDraw,
} = require('./core');
const texts = require('../resources/texts.json');

// Helper variable to detect when game ends if no winning-condition has been met
// AI has 3 kind of moves: winning move, blocking move, and move that just continues game,
// hence going to some empty position.
let winningPositions = [];
let blockingPositions = [];
let emptyPositions = [];

const returnOptimalMove = () => {
  let move = null;
  if (winningPositions.length > 0) {
    [move] = winningPositions;
  } else if (blockingPositions.length > 0) {
    [move] = blockingPositions;
  } else {
    [move] = emptyPositions;
  }
  winningPositions = [];
  blockingPositions = [];
  emptyPositions = [];
  return {
    row: move.row,
    column: move.column,
    playerNumber: 2,
  };
};


const saveOptimalMove = (ownMarksInRow, opponentMarksInRow, emptyIndex) => {
  if (ownMarksInRow === 2 && emptyIndex !== null) {
    winningPositions.push(emptyIndex);
  }
  if (opponentMarksInRow === 2 && emptyIndex !== null) {
    blockingPositions.push(emptyIndex);
  }
};

const findOptimalMove = () => {
  // Inspect rows
  Board.forEach((row, rowIndex) => {
    let ownMarksInRow = 0;
    let opponentMarksInRow = 0;
    let emptyPosition = null;
    row.forEach((mark, columnIndex) => {
      if (mark === 1) {
        opponentMarksInRow += 1;
      }
      if (mark === 2) {
        ownMarksInRow += 1;
      }
      if (mark !== 1 && mark !== 2) {
        emptyPosition = { row: rowIndex, column: columnIndex };
        emptyPositions.push(emptyPosition);
      }
    });
    saveOptimalMove(ownMarksInRow, opponentMarksInRow, emptyPosition);
  });

  // Inspect columns
  getBoardByColumns(Board).forEach((row, columnIndex) => {
    let ownMarksInRow = 0;
    let opponentMarksInRow = 0;
    let emptyPosition = null;
    row.forEach((mark, rowIndex) => {
      if (mark === 1) {
        opponentMarksInRow += 1;
      }
      if (mark === 2) {
        ownMarksInRow += 1;
      }
      if (mark !== 1 && mark !== 2) {
        emptyPosition = { row: rowIndex, column: columnIndex };
        emptyPositions.push(emptyPosition);
      }
    });
    saveOptimalMove(ownMarksInRow, opponentMarksInRow, emptyPosition);
  });

  // Inspect diagonal rows
  const topLeftToBotRight = [Board[0][0], Board[1][1], Board[2][2]];
  const botLeftToTopRight = [Board[2][0], Board[1][1], Board[0][2]];
  let ownMarksInRow = 0;
  let opponentMarksInRow = 0;
  let emptyPosition = null;
  topLeftToBotRight.forEach((mark, rowIndex) => {
    if (mark === 1) {
      opponentMarksInRow += 1;
    }
    if (mark === 2) {
      ownMarksInRow += 1;
    }
    if (mark !== 1 && mark !== 2) {
      emptyPosition = { row: rowIndex, column: rowIndex };
      emptyPositions.push(emptyPosition);
    }
  });
  saveOptimalMove(ownMarksInRow, opponentMarksInRow, emptyPosition);

  ownMarksInRow = 0;
  opponentMarksInRow = 0;
  emptyPosition = null;
  botLeftToTopRight.forEach((mark, index) => {
    if (mark === 1) {
      opponentMarksInRow += 1;
    }
    if (mark === 2) {
      ownMarksInRow += 1;
    }
    if (mark !== 1 && mark !== 2) {
      emptyPosition = { row: (botLeftToTopRight.length - 1) - index, column: index };
      emptyPositions.push(emptyPosition);
    }
  });
  saveOptimalMove(ownMarksInRow, opponentMarksInRow, emptyPosition);
  return returnOptimalMove();
};

const checkForWinner = (board) => (
  checkRows(board) || checkColumns(board) || checkDiagonalRows(board)
);

const simulateComputerMove = (responseCallback, startingMoveMessage = null) => {
  makeMove(findOptimalMove());
  const winConditionMet = checkForWinner(Board);
  if (winConditionMet) {
    setWinner(2);
    responseCallback(200, {
      message: texts.computerWon,
      layout: layoutTransformation(Board),
      updatedBoard: Board,
    });
    return;
  }
  if (gameIsDraw()) {
    responseCallback(200, {
      message: texts.draw,
      layout: layoutTransformation(Board),
      updatedBoard: Board,
    });
  }
  responseCallback(200, {
    message: startingMoveMessage || texts.yourTurn,
    layout: layoutTransformation(Board),
    updatedBoard: Board,
  });
};

const doPlayersMove = (move, responseCallback) => {
  if (moveIsValid(move, Board)) {
    makeMove(move);
    const winConditionMet = checkForWinner(Board);
    if (winConditionMet) {
      setWinner(1);
      responseCallback(200, {
        message: texts.playerWon,
        layout: layoutTransformation(Board),
        updatedBoard: Board,
      });
      return;
    }
    if (gameIsDraw()) {
      responseCallback(200, {
        message: texts.draw,
        layout: layoutTransformation(Board),
        updatedBoard: Board,
      });
    } else {
      simulateComputerMove(responseCallback);
    }
  } else {
    responseCallback(500, { message: texts.illegalMove });
  }
};

module.exports = {
  doPlayersMove,
  simulateComputerMove,
  checkForWinner,
  findOptimalMove,
  makeMove,
};
