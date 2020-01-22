const express = require('express');
const { doPlayersMove, simulateComputerMove } = require('../game/gameLogic');
const { setupGame, isGameStarted, resetGame } = require('../game/core');
const texts = require('../resources/texts');


const startGame = (req, res) => {
  const callback = (status, resBody) => {
    res.status = status;
    res.send(resBody);
  };
  setupGame(callback, simulateComputerMove);
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
router.use('/reset', reset);

module.exports = router;
