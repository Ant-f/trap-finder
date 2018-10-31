import { fromJS } from 'immutable';
import pointHelper from './point-helper';
import rng from './random-number-generator';

const createTraps = (width, height, trapCount) => {
  const traps = [];
    
  while (traps.length < trapCount) {
    const x = rng(width);
    const y = rng(height);

    const exists = traps.findIndex(point =>
      point.x === x && point.y === y) > -1;

    if (!exists) {
      traps.push({ x, y });
    }
  }

  return traps;
};

const createBoard = (width, height, traps) => {
  const board = [];

  for (let x = 0; x < width; x++) {
    board[x] = [];

    for (let y = 0; y < height; y++) {
      const isTrapLocation = traps.findIndex(point =>
        point.x === x && point.y === y) > -1;
      
      board[x][y] = {
        adjacentTrapCount: 0,
        isFlagged: false,
        isRevealed: false,
        isTrap: isTrapLocation
      };
    }
  }

  return board;
};

const setAdjacentTrapCount = (traps, board) => {
  const width = board.length;
  const height = board[0].length;

  traps.forEach(({ x, y }) => {
    const surroundingPoints = pointHelper.getSurroundingValidPoints(
      x,
      y,
      width - 1,
      height - 1);

    surroundingPoints.forEach(point => {
      board[point.x][point.y].adjacentTrapCount++;
    });
  });
};

export default {
  generateBoard(width, height, trapCount) {
    const traps = createTraps(width, height, trapCount);
    const board = createBoard(width, height, traps);
    setAdjacentTrapCount(traps, board);
    return fromJS(board);
  }
};
