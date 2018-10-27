import pointHelper from './point-helper';

const reveal = (x, y, board) => {
  board[x][y].isRevealed = true;

  if (board[x][y].adjacentTrapCount === 0) {
    const surroundingPoints = pointHelper.getSurroundingValidPoints(
      x,
      y,
      board.length - 1,
      board[0].length - 1);
    
    surroundingPoints
      .filter(point => !board[point.x][point.y].isRevealed)
      .forEach(point => reveal(point.x, point.y, board));
  }
};

export default reveal;
