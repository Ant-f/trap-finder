import * as React from 'react';
import * as styles from '../../stylesheets/trap-grid.scss';
import * as countStyles from '../../stylesheets/trap-count.scss';
import PropTypes from 'prop-types';

const countColours = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight'
};

export const getClasses = (classNames, isGameOver, isRevealed, isTrap) => {
  let modifier;

  if (isGameOver && isTrap) {
    modifier = classNames.trap;
  }
  else {
    if (isRevealed) {
      modifier = classNames.revealed;
    }
    else {
      modifier = classNames.unrevealed;
    }
  }

  return `${classNames.cell} ${modifier}`;
};

const GridCell = ({ adjacentTrapCount, isGameOver, isRevealed, isTrap, revealCell }) => (
  <div
    className={getClasses(styles, isGameOver, isRevealed, isTrap)}
    onClick={revealCell}>
    {
      isTrap
        ? isGameOver
          ? <img src="images/bear-trap.svg" />
          : null
        : isRevealed && adjacentTrapCount > 0
          ? <span className={`
              ${countStyles.trapCount}
              ${countStyles[countColours[adjacentTrapCount]]}`}>
            {adjacentTrapCount}
          </span>
          : null
    }
  </div>
);

GridCell.propTypes = {
  adjacentTrapCount: PropTypes.number.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  isTrap: PropTypes.bool.isRequired,
  revealCell: PropTypes.func.isRequired
};

export default GridCell;
