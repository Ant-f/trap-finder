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

export const getClasses = (classNames, isGameLost, isRevealed, isTrap) => {
  let modifier;

  if (isGameLost && isTrap) {
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

const onClick = (e, revealCell, toggleFlag) => {
  if (e.ctrlKey) {
    toggleFlag();
  }
  else {
    revealCell();
  }
};

const GridCell = ({ adjacentTrapCount, isFlagged, isGameLost, isRevealed, isTrap, revealCell, toggleFlag }) => (
  <div
    className={getClasses(styles, isGameLost, isRevealed, isTrap)}
    onClick={e => { onClick(e, revealCell, toggleFlag); }}>
    {
      isTrap
        ? isGameLost
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
    {
      isFlagged
        ? <img src="images/red-flag.svg" />
        : null
    }
  </div>
);

GridCell.propTypes = {
  adjacentTrapCount: PropTypes.number.isRequired,
  isFlagged: PropTypes.bool.isRequired,
  isGameLost: PropTypes.bool.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  isTrap: PropTypes.bool.isRequired,
  revealCell: PropTypes.func.isRequired,
  toggleFlag: PropTypes.func.isRequired
};

export default GridCell;
