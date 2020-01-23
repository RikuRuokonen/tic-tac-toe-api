const express = require('express');
const { doPlayersMove, simulateComputerMove } = require('../game/gameLogic');
const {
  isGameStarted,
  resetGame,
  getBoard,
  getWinner,
} = require('../game/core');
const texts = require('../resources/texts');


const startGame = (req, res) => {
  const callback = (status, resBody) => {
    res.status = status;
    res.send(resBody);
  };
  resetGame(callback, simulateComputerMove);
};

const executeMove = (req, res) => {
  const { body } = req;
  const callback = (status, resBody) => {
    res.status = status;
    res.send(resBody);
  };
  if (isGameStarted() !== true) {
    res.status(500).send({ message: texts.gameNotYetStarted });
  } else {
    doPlayersMove(body.move, callback);
  }
};

const getStatus = (req, res) => {
  const board = getBoard();
  const winner = getWinner();
  res.status(200).send({
    board,
    winner,
  });
};

// Currently works exactly like /start endpoint, but may be extended to additinal functionality
const reset = (req, res) => {
  const callback = (status, resBody) => {
    res.status = status;
    res.send(resBody);
  };
  resetGame(callback, simulateComputerMove);
};

const router = express.Router();
router.use('/start', startGame);
router.use('/do-move', executeMove);
router.use('/status', getStatus);
router.use('/reset', reset);

module.exports = router;
