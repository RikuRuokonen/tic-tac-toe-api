/* eslint-disable no-underscore-dangle */
const {
  expect,
} = require('chai');
const { moveIsValid, getBoardByColumns } = require('../utils/helpers');

describe('Utils usage', () => {
  it('Detects allowed move', () => {
    const testBoard = [
      [1, 1, 0],
      [2, 2, 0],
      [0, 0, 0],
    ];

    expect(moveIsValid(
      {
        row: 2,
        column: 0,
        playerNumber: 1,
      },
      testBoard,
    )).to.deep.equal(true);
  });
  it('Detects illegal move', () => {
    const testBoard = [
      [1, 1, 0],
      [2, 2, 0],
      [0, 0, 0],
    ];

    expect(moveIsValid(
      {
        row: 0,
        column: 0,
        playerNumber: 1,
      },
      testBoard,
    )).to.deep.equal(false);
  });
  it('Transposes matrix correctly', () => {
    const testBoard = [
      [1, 0, 0],
      [2, 2, 0],
      [1, 0, 1],
    ];

    const expected = [
      [1, 2, 1],
      [0, 2, 0],
      [0, 0, 1],
    ];
    expect(getBoardByColumns(testBoard)).to.deep.equal(expected);
  });
});
