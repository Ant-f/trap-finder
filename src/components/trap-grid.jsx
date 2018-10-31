import * as React from 'react';
import * as styles from '../../stylesheets/trap-grid.scss';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import GridCell from './grid-cell.jsx';

const TrapGrid = ({ isGameLost, model, revealCellAt }) => (
  <div className={`${styles.columnSet}`}>
    {
      model.map((column, x) =>
        <div key={x}>
          {
            column.map((cell, y) =>
              <GridCell
                adjacentTrapCount={cell.get('adjacentTrapCount')}
                isGameLost={isGameLost}
                isRevealed={cell.get('isRevealed')}
                isTrap={cell.get('isTrap')}
                key={y}
                revealCell={() => revealCellAt(x, y)} />
            )
          }
        </div>
      )
    }
  </div>
);

TrapGrid.propTypes = {
  isGameLost: PropTypes.bool.isRequired,
  model: ImmutablePropTypes.listOf(
    ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        adjacentTrapCount: PropTypes.number,
        isTrap: PropTypes.bool
      })
    )
  ).isRequired,
  revealCellAt: PropTypes.func.isRequired
};

export default TrapGrid;
