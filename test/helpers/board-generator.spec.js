/* global describe, it, require */

import { expect } from 'chai';
import generator from '../../src/helpers/board-generator';

const getBoardGenerator = (fixedRandomNumberSequence) => {
  const generatorModule = require('inject-loader!../../src/helpers/board-generator');
  const returnValues = fixedRandomNumberSequence;

  const generatorWithInjection = generatorModule({
    './random-number-generator': {
      getRandomInt() {
        return returnValues.shift();
      }
    }
  }).default;

  return generatorWithInjection;
};

describe('Board generator', function () {
  it('returns a correct sized board', function () {

    // Arrange

    const height = 3;
    const width = 5;

    // Act

    const board = generator.generateBoard(width, height, 0);

    // Assert

    expect(board.length).to.equal(width);

    board.forEach(column => {
      expect(column.length).to.equal(height);
    });
  });

  it('sets traps in the correct place', function () {

    // Arrange
    
    const generatorWithInjection = getBoardGenerator([0, 1, 2, 3]);
    const height = 3;
    const width = 5;

    // Act

    const board = generatorWithInjection.generateBoard(width, height, 2);

    // Assert

    board.forEach((column, x) => {
      column.forEach((cell, y) => {
        const expected =
          (x === 0 && y === 1) ||
          (x === 2 && y === 3);

        expect(cell.isTrap, `(x:${x}, y:${y})`).to.equal(expected);
      });
    });
  });

  it('regenerates already existing trap locations', function () {

    // Arrange
    
    const trapCount = 2;
    const generatorWithInjection = getBoardGenerator([1, 1, 1, 1, 3, 2]);
    const height = 3;
    const width = 5;

    // Act

    const board = generatorWithInjection.generateBoard(width, height, trapCount);

    // Assert
    
    const cells = board.flat();
    const traps = cells.filter(c => c.isTrap === true);
    expect(traps.length).to.equal(trapCount);
    expect(board[1][1].isTrap).to.be.true;
    expect(board[3][2].isTrap).to.be.true;
  });

  it('sets adjacentTrapCount for one trap', function () {

    // Arrange
    
    const generatorWithInjection = getBoardGenerator([0, 0]);
    const height = 3;
    const width = 2;

    // Act

    const board = generatorWithInjection.generateBoard(width, height, 1);

    // Assert
    
    const expected = [
      { x: 0, y: 0, result: 0 },
      { x: 1, y: 0, result: 1 },
      { x: 0, y: 1, result: 1 },
      { x: 1, y: 1, result: 1 },
      { x: 0, y: 2, result: 0 },
      { x: 1, y: 2, result: 0 }
    ];

    expected.forEach(({ x, y, result }) => {
      expect(board[x][y].adjacentTrapCount, `(x:${x}, y:${y})`).to.equal(result);
    });
  });

  it('sets adjacentTrapCount for two traps', function () {

    // Arrange
    
    const generatorWithInjection = getBoardGenerator([0, 0, 1, 0]);
    const height = 3;
    const width = 2;

    // Act

    const board = generatorWithInjection.generateBoard(width, height, 2);

    // Assert

    const expected = [
      { x: 0, y: 0, result: 1 },
      { x: 1, y: 0, result: 1 },
      { x: 0, y: 1, result: 2 },
      { x: 1, y: 1, result: 2 },
      { x: 0, y: 2, result: 0 },
      { x: 1, y: 2, result: 0 }
    ];

    expected.forEach(({ x, y, result }) => {
      expect(board[x][y].adjacentTrapCount, `(x:${x}, y:${y})`).to.equal(result);
    });
  });

  it('sets isRevealed false on cell by default', function () {

    // Arrange

    const height = 1;
    const width = 1;

    // Act

    const board = generator.generateBoard(width, height, 0);

    // Assert

    expect(board[0][0].isRevealed).to.be.false;
  });
});
