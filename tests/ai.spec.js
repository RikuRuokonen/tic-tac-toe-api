/* eslint-disable no-underscore-dangle */
const {
  expect,
} = require('chai');
const rewire = require('rewire');

const core = rewire('../game/core.js');
const gameLogic = rewire('../game/gameLogic.js');
const { findOptimalMove } = gameLogic;
const { makeMove } = core;


describe('Optimazing moves', () => {
  describe('finds winning-move', () => {
    it('when winning move is end of the row', async () => {
      const testBoard = [
        [1, 1, 0],
        [2, 2, 0],
        [0, 0, 0],
      ];
      const expected = [
        [1, 1, 0],
        [2, 2, 2],
        [0, 0, 0],
      ];
      core.__set__('Board', testBoard);
      gameLogic.__set__('Board', testBoard);
      const move = findOptimalMove();
      makeMove(move);
      expect(core.__get__('Board')).to.deep.equal(expected);
    });
    it('when winning move is end of the column', async () => {
      const testBoard = [
        [1, 2, 0],
        [1, 2, 0],
        [0, 0, 0],
      ];
      const expected = [
        [1, 2, 0],
        [1, 2, 0],
        [0, 2, 0],
      ];
      core.__set__('Board', testBoard);
      gameLogic.__set__('Board', testBoard);
      const move = findOptimalMove();
      makeMove(move);
      expect(core.__get__('Board')).to.deep.equal(expected);
    });
    it('when winning move is end of the diagonal row, from top-left to bottom-right', async () => {
      const testBoard = [
        [2, 1, 0],
        [1, 2, 0],
        [0, 0, 0],
      ];
      const expected = [
        [2, 1, 0],
        [1, 2, 0],
        [0, 0, 2],
      ];
      core.__set__('Board', testBoard);
      gameLogic.__set__('Board', testBoard);
      const move = findOptimalMove();
      makeMove(move);
      expect(core.__get__('Board')).to.deep.equal(expected);
    });
  });

  describe('finds blocking-move', () => {
    it('when blocking-move is end of the row', async () => {
      const testBoard = [
        [1, 1, 0],
        [0, 2, 0],
        [0, 0, 0],
      ];
      const expected = [
        [1, 1, 2],
        [0, 2, 0],
        [0, 0, 0],
      ];
      core.__set__('Board', testBoard);
      gameLogic.__set__('Board', testBoard);
      const move = findOptimalMove();
      makeMove(move);
      expect(core.__get__('Board')).to.deep.equal(expected);
    });
    it('when blocking-move is end of the column', async () => {
      const testBoard = [
        [1, 2, 0],
        [1, 0, 0],
        [0, 0, 0],
      ];
      const expected = [
        [1, 2, 0],
        [1, 0, 0],
        [2, 0, 0],
      ];
      core.__set__('Board', testBoard);
      gameLogic.__set__('Board', testBoard);
      const move = findOptimalMove();
      makeMove(move);
      expect(core.__get__('Board')).to.deep.equal(expected);
    });
    it('when blocking-move is end of the diagonal row, from top-left to bottom-right', async () => {
      const testBoard = [
        [1, 2, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];
      const expected = [
        [1, 2, 0],
        [0, 1, 0],
        [0, 0, 2],
      ];
      core.__set__('Board', testBoard);
      gameLogic.__set__('Board', testBoard);
      const move = findOptimalMove();
      makeMove(move);
      expect(core.__get__('Board')).to.deep.equal(expected);
    });
  });
});
