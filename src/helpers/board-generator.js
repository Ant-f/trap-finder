import { getRandomInt } from './random-number-generator';

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
        isTrap: isTrapLocation
      };
    }
  }

  return board;
};

const boardGenerator = {
  generateBoard(width, height, trapCount) {
    const traps = createTraps(width, height, trapCount);
    const board = createBoard(width, height, traps);
    return board;
  }
};

export default boardGenerator;
