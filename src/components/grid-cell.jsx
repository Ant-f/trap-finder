import * as React from 'react';
import * as styles from '../../stylesheets/trap-grid.scss';
import PropTypes from 'prop-types';

const GridCell = ({ adjacentTrapCount, isGameOver, isRevealed, isTrap, revealCell }) => (
  <div className={styles.cell} onClick={revealCell}>
    {
      isTrap
        ? isGameOver
          ? <span>
            T
          </span>
          : null
        : isRevealed && adjacentTrapCount > 0
          ? <span>
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
