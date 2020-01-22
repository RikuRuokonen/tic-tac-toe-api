const _ = require('lodash');

const getBoardByColumns = (board) => _.zip(...board);

const moveIsValid = (move, board) => board[move.row][move.column] === 0;

const checkRows = (board) => {
  let win = false;
  board.forEach((row) => {
    let ownMarks = 0;
    let opponentMarks = 0;
    row.forEach((mark) => {
      if (mark === 1) {
        opponentMarks += 1;
      }
      if (mark === 2) {
        ownMarks += 1;
      }
    });
    if (ownMarks === 3 || opponentMarks === 3) {
      win = true;
    }
  });
  return win;
};

const checkColumns = (board) => {
  let win = false;
  getBoardByColumns(board).forEach((column) => {
    let ownMarks = 0;
    let opponentMarks = 0;
    column.forEach((mark) => {
      if (mark === 1) {
        opponentMarks += 1;
      }
      if (mark === 2) {
        ownMarks += 1;
      }
    });

    if (ownMarks === 3 || opponentMarks === 3) {
      win = true;
    }
  });
  return win;
};

const checkDiagonalRows = (board) => {
  let win = false;
  const topLeftToBotRight = [board[0][0], board[1][1], board[2][2]];
  const botLeftToTopRight = [board[2][0], board[1][1], board[0][2]];
  let ownMarks = 0;
  let opponentMarks = 0;
  topLeftToBotRight.forEach((mark) => {
    if (mark === 1) {
      opponentMarks += 1;
    }
    if (mark === 2) {
      ownMarks += 1;
    }
  });
  if (ownMarks === 3 || opponentMarks === 3) {
    win = true;
  }
  opponentMarks = 0;
  ownMarks = 0;

  botLeftToTopRight.forEach((mark) => {
    if (mark === 1) {
      opponentMarks += 1;
    }
    if (mark === 2) {
      ownMarks += 1;
    }
  });
  if (ownMarks === 3 || opponentMarks === 3) {
    win = true;
  }
  return win;
};

module.exports = {
  getBoardByColumns,
  moveIsValid,
  checkRows,
  checkColumns,
  checkDiagonalRows,
};
