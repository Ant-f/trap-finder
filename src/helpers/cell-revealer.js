import helper from './point-helper';

const reveal = (x, y, board, maxX, maxY) => {
  const isFlagged = board.getIn([x, y, 'isFlagged']);
  
  if (isFlagged) {
    return board;
  }

  let updated = board.setIn([x, y, 'isRevealed'], true);

  if (board.getIn([x, y, 'adjacentTrapCount']) === 0) {
    const surroundingPoints = helper.getSurroundingValidPoints(x, y, maxX, maxY);

    surroundingPoints.forEach(point => {
      const isFlagged = updated.getIn([point.x, point.y, 'isFlagged']);
      const isRevealed = updated.getIn([point.x, point.y, 'isRevealed']);

      if (!isFlagged && !isRevealed) {
        updated = reveal(point.x, point.y, updated, maxX, maxY);
      }
    });
  }

  return updated;
};

const revealWithMutation = (x, y, board) => {
  return board.withMutations(b => reveal(
    x,
    y,
    b,
    b.size - 1,
    b.get(0).size - 1));
};

export default revealWithMutation;
