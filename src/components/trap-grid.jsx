import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import GridCell from './grid-cell.jsx';

const TrapGrid = ({ isGameOver, model, revealCellAt }) => (
  <div>
    {
      model.map((column, x) =>
        <div key={x}>
          {
            column.map((cell, y) =>
              <button key={y}>
                <GridCell
                  adjacentTrapCount={cell.get('adjacentTrapCount')}
                  isGameOver={isGameOver}
                  isRevealed={cell.get('isRevealed')}
                  isTrap={cell.get('isTrap')}
                  revealCell={() => revealCellAt(x, y)} />
              </button>
            )
          }
        </div>
      )
    }
  </div>
);

TrapGrid.propTypes = {
  isGameOver: PropTypes.bool.isRequired,
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
