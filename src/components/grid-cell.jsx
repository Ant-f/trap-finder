import * as React from 'react';
import * as styles from '../../stylesheets/trap-grid';
import * as colours from '../../stylesheets/trap-count-colours';
import bearTrap from '../../images/bear-trap';
import PropTypes from 'prop-types';
import redCross from '../../images/red-cross';
import redFlag from '../../images/red-flag';

const colourNames = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight'
};

const getClasses = (isFlagged, isGameLost, isRevealed, isTrap) => {
  let modifier;

  if (isGameLost && isTrap) {
    modifier = isFlagged
      ? styles.flagged
      : styles.trap;
  }
  else {
    if (isRevealed) {
      modifier = styles.revealed;
    }
    else {
      modifier = isFlagged
        ? styles.flagged
        : styles.unrevealed;
    }
  }

  return `${styles.cell} ${modifier}`;
};

const onClick = (e, isFlagInput, isGameLost, isGameWon, revealCell, toggleFlag) => {
  if (isGameLost || isGameWon) {
    return;
  }
  
  if (e.ctrlKey || isFlagInput) {
    toggleFlag();
  }
  else {
    revealCell();
  }
};

const updateRevealCellStatus = (e, newValue, setRevealCellStatus) => {
  if (!e.ctrlKey) {
    setRevealCellStatus(newValue);
  }
};

const GridCell = ({ adjacentTrapCount, isFlagInput, isFlagged, isGameLost, isGameWon, isRevealed, isTrap, revealCell, setRevealCellStatus, toggleFlag }) => (
  <div
    className={getClasses(isFlagged, isGameLost, isRevealed, isTrap)}
    onClick={e => onClick(e, isFlagInput, isGameLost, isGameWon, revealCell, toggleFlag)}
    onMouseDown={e => updateRevealCellStatus(e, true, setRevealCellStatus)}
    onMouseUp={e => updateRevealCellStatus(e, false, setRevealCellStatus)}>
    {
      isTrap
        ? isGameLost
          ? <img
            className={`
              ${isFlagged ? styles.faded : null}
              ${styles.image}`}
            src={bearTrap} />
          : null
        : isRevealed && adjacentTrapCount > 0
          ? <div className={`
              ${styles.trapCount}
              ${colours[colourNames[adjacentTrapCount]]}`}>
            {adjacentTrapCount}
          </div>
          : null
    }
    {
      isFlagged
        ? <img
          className={`
            ${isGameLost && !isTrap ? styles.faded : null}
            ${styles.image}
            ${styles.imageOverlay}`}
          src={redFlag} />
        : null
    }
    {
      isGameLost && isFlagged && !isTrap
        ? <img
          className={`
            ${styles.imageOverlay}
            ${styles.smallImage}`}
          src={redCross} />
        : null
    }
    <div className={styles.cellHighlight} />
  </div>
);

GridCell.propTypes = {
  adjacentTrapCount: PropTypes.number.isRequired,
  isFlagged: PropTypes.bool.isRequired,
  isFlagInput: PropTypes.bool.isRequired,
  isGameLost: PropTypes.bool.isRequired,
  isGameWon: PropTypes.bool.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  isTrap: PropTypes.bool.isRequired,
  revealCell: PropTypes.func.isRequired,
  setRevealCellStatus: PropTypes.func.isRequired,
  toggleFlag: PropTypes.func.isRequired
};

export default GridCell;
