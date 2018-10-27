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
    const surroundingPoints = [
      { x: x - 1, y: y - 1 },
      { x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y },
      { x: x + 1, y },
      { x: x - 1, y: y + 1 },
      { x, y: y + 1 },
      { x: x + 1, y: y + 1 }
    ];

    surroundingPoints
      .filter(point => point.x > -1 &&
        point.x < width &&
        point.y > -1 &&
        point.y < height)
      .forEach(point => {
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
