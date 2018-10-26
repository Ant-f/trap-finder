/* global describe, it, require */

import { expect } from 'chai';
import generator from '../../src/helpers/board-generator';

describe('trap location generator', function() {
  it('returns a correct sized board', function() {

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

  it('sets traps in the correct place', function() {

    // Arrange
    
    const generatorModule = require('inject-loader!../../src/helpers/board-generator');
    const returnValues = [0, 1, 2, 3];

    const generatorWithInjection = generatorModule({
      './random-number-generator': {
        getRandomInt() {
          return returnValues.shift();
        }
      }
    }).default;

    const height = 3;
    const width = 5;

    // Act

    const board = generatorWithInjection.generateBoard(width, height, 2);

    // Assert

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const expected =
        (x === 0 && y === 1) ||
        (x === 2 && y === 3);

        const actual = board[x][y].isTrap;
        expect(actual, `(x:${x}, y:${y})`).to.equal(expected);
      }
    }
  });

  it('regenerates already existing trap locations', function() {

    // Arrange
    
    const trapCount = 2;
    const generatorModule = require('inject-loader!../../src/helpers/board-generator');
    const returnValues = [1, 1, 1, 1, 3, 2];

    const generatorWithInjection = generatorModule({
      './random-number-generator': {
        getRandomInt() {
          return returnValues.shift();
        }
      }
    }).default;

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

  it('sets adjacentTrapCount for one trap', function() {

    // Arrange
    
    const generatorModule = require('inject-loader!../../src/helpers/board-generator');
    const returnValues = [0, 0];

    const generatorWithInjection = generatorModule({
      './random-number-generator': {
        getRandomInt() {
          return returnValues.shift();
        }
      }
    }).default;

    const height = 3;
    const width = 2;

    // Act

    const board = generatorWithInjection.generateBoard(width, height, 1);

    // Assert
    
    expect(board[0][0].adjacentTrapCount, '[0, 0]').to.equal(0);
    expect(board[1][0].adjacentTrapCount, '[1, 0]').to.equal(1);
    expect(board[0][1].adjacentTrapCount, '[0, 1]').to.equal(1);
    expect(board[1][1].adjacentTrapCount, '[1, 1]').to.equal(1);
    expect(board[0][2].adjacentTrapCount, '[0, 2]').to.equal(0);
    expect(board[1][2].adjacentTrapCount, '[1, 2]').to.equal(0);
  });

  it('sets adjacentTrapCount for two traps', function() {

    // Arrange
    
    const generatorModule = require('inject-loader!../../src/helpers/board-generator');
    const returnValues = [0, 0, 1, 0];

    const generatorWithInjection = generatorModule({
      './random-number-generator': {
        getRandomInt() {
          return returnValues.shift();
        }
      }
    }).default;

    const height = 3;
    const width = 2;

    // Act

    const board = generatorWithInjection.generateBoard(width, height, 2);

    // Assert
    
    expect(board[0][0].adjacentTrapCount, '[0, 0]').to.equal(1);
    expect(board[1][0].adjacentTrapCount, '[1, 0]').to.equal(1);
    expect(board[0][1].adjacentTrapCount, '[0, 1]').to.equal(2);
    expect(board[1][1].adjacentTrapCount, '[1, 1]').to.equal(2);
    expect(board[0][2].adjacentTrapCount, '[0, 2]').to.equal(0);
    expect(board[1][2].adjacentTrapCount, '[1, 2]').to.equal(0);
  });
});
