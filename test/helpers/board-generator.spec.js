/* global describe, it, require */

import { expect } from 'chai';
import BoardGenerator from '../../src/helpers/board-generator';

describe('trap location generator', function() {
  it('returns a correct sized board', function() {

    // Arrange

    const height = 3;
    const width = 5;

    // Act

    const generator = new BoardGenerator();
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

    const BoardGeneratorWithInjection = generatorModule({
      './random-number-generator': class {
        getRandomInt() {
          return returnValues.shift();
        }
      }
    }).default;

    const height = 3;
    const width = 5;

    // Act

    const generator = new BoardGeneratorWithInjection();
    const board = generator.generateBoard(width, height, 2);

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
});
