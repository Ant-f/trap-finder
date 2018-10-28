import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

const TrapGrid = ({ isGameOver, model, revealCell }) => (
  <div>
    {
      model.map((column, x) =>
        <div key={x}>
          {
            column.map((cell, y) =>
              <button onClick={ () => revealCell(x, y) } key={y}>
                {`(${x}, ${y})`}
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
  revealCell: PropTypes.func.isRequired
};

export default TrapGrid;
