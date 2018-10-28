/* global describe, it */

import { fromJS } from 'immutable';
import { expect } from 'chai';
import reveal from '../../src/helpers/cell-revealer';

const convertToBoard = input => {
  const cellDelimiter = ' ';
  const board = [];
  const height = input[0].split(cellDelimiter).length;

  for (let i = 0; i < height; i++) {
    board.push([]);
  }

  input.forEach((row, y) => {
    const cells = row.split(cellDelimiter);
    
    cells.forEach((cell, x) => {
      const adjacentTrapCount = Number(cell);
      const isTrap = Number.isNaN(adjacentTrapCount);
      board[x][y] = {
        adjacentTrapCount,
        isRevealed: false,
        isTrap
      };
    });
  });

  return fromJS(board);
};

describe('Cell revealer', function () {
  it('Reveals contiguous safe cells', function () {
    
    // Arrange
    
    const board = convertToBoard([
      '0 0 0',
      '0 1 1',
      '0 1 T'
    ]);

    // Act

    const updated = reveal(0, 0, board);
    
    // Assert

    const expectedRevealed = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 }
    ];

    expectedRevealed.forEach(point => {
      const actual = updated.getIn([point.x, point.y, 'isRevealed']);
      expect(actual, `(x:${point.x}, y:${point.y})`).to.be.true;
    });

    expect(updated.getIn([2, 2, 'isRevealed'])).to.be.false;
  });
});
