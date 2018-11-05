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

const getClasses = (classNames, isGameLost, isRevealed, isTrap) => {
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

const onClick = (e, isGameLost, isGameWon, revealCell, toggleFlag) => {
  if (isGameLost || isGameWon) {
    return;
  }
  
  if (e.ctrlKey) {
    toggleFlag();
  }
  else {
    revealCell();
  }
};

const GridCell = ({ adjacentTrapCount, isFlagged, isGameLost, isGameWon, isRevealed, isTrap, revealCell, setRevealCellStatus, toggleFlag }) => (
  <div
    className={getClasses(styles, isGameLost, isRevealed, isTrap)}
    onClick={e => { onClick(e, isGameLost, isGameWon, revealCell, toggleFlag); }}
    onMouseDown={() => setRevealCellStatus(true)}
    onMouseUp={() => setRevealCellStatus(false)}>
    {
      isTrap
        ? isGameLost
          ? <img className={isFlagged ? styles.faded : null} src="images/bear-trap.svg" />
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
        ? <img
          className={`${isGameLost && !isTrap ? styles.faded : null} ${styles.overlay}`}
          src="images/red-flag.svg" />
        : null
    }
    {
      isGameLost && isFlagged && !isTrap
        ? <img
          className={`${styles.overlay} ${styles.smallImage}`}
          src="images/red-cross.svg" />
        : null
    }
  </div>
);

GridCell.propTypes = {
  adjacentTrapCount: PropTypes.number.isRequired,
  isFlagged: PropTypes.bool.isRequired,
  isGameLost: PropTypes.bool.isRequired,
  isGameWon: PropTypes.bool.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  isTrap: PropTypes.bool.isRequired,
  revealCell: PropTypes.func.isRequired,
  setRevealCellStatus: PropTypes.func.isRequired,
  toggleFlag: PropTypes.func.isRequired
};

export default GridCell;
