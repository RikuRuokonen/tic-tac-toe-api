/* eslint-disable no-underscore-dangle */
const {
  expect,
} = require('chai');
const { checkForWinner } = require('../game/gameLogic');

describe('Detecting win and draw-conditions', () => {
  describe('Detects win when', () => {
    it('Occurs end of the row', async () => {
      const testBoard = [
        [1, 1, 0],
        [2, 2, 2],
        [0, 0, 0],
      ];
      expect(checkForWinner(testBoard)).to.deep.equal(true);
    });
    it('Occurs end of the column', async () => {
      const testBoard = [
        [1, 2, 0],
        [1, 2, 0],
        [1, 0, 0],
      ];
      expect(checkForWinner(testBoard)).to.deep.equal(true);
    });
    it('Occurs end of the diagonal row, from bottom-left to top-right', async () => {
      const testBoard = [
        [1, 1, 2],
        [1, 2, 1],
        [2, 0, 0],
      ];
      expect(checkForWinner(testBoard)).to.deep.equal(true);
    });
  });
});
