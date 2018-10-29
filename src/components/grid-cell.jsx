import * as React from 'react';
import * as styles from '../../stylesheets/grid-cell.scss';
import PropTypes from 'prop-types';

const GridCell = ({ adjacentTrapCount, isGameOver, isRevealed, isTrap, revealCell }) => (
  <div className={styles.cell} onClick={revealCell}>
    {
      isTrap
        ? isGameOver
          ? <span>
            T
          </span>
          : '(Empty)'
        : isRevealed && adjacentTrapCount > 0
          ? <span>
            {adjacentTrapCount}
          </span>
          : '(Empty)'
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