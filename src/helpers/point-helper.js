export default {
  getSurroundingValidPoints: (x, y, maxX, maxY) => {
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

    const validPoints = surroundingPoints.filter(point =>
      point.x > -1 &&
      point.x <= maxX &&
      point.y > -1 &&
      point.y <= maxY);
    
    return validPoints;
  }
};
