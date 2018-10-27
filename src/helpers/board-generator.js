import { getRandomInt } from './random-number-generator';
import pointHelper from './point-helper';

const createTraps = (width, height, trapCount) => {
  const traps = [];
    
  while (traps.length < trapCount) {
    const x = getRandomInt(width);
    const y = getRandomInt(height);

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

const boardGenerator = {
  generateBoard(width, height, trapCount) {
    const traps = createTraps(width, height, trapCount);
    const board = createBoard(width, height, traps);
    setAdjacentTrapCount(traps, board);
    return board;
  }
};

export default boardGenerator;
