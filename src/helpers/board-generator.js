import rng from './random-number-generator';

class BoardGenerator {
  generateBoard(width, height, trapCount) {
    const traps = [];
    const random = new rng();
    
    while (traps.length < trapCount) {
      const point = {
        x: random.getRandomInt(width),
        y: random.getRandomInt(height)
      };

      traps.push(point);
    }

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
  }
}

export default BoardGenerator;
