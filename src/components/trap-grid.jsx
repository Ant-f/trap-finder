import * as React from 'react';
import PropTypes from 'prop-types';

const TrapGrid = ({ model }) => (
  <div>
    {
      model.map((column, x) =>
        <div key={x}>
          {
            column.map((cell, y) =>
              <button key={y}>
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
  model: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        adjacentTrapCount: PropTypes.number,
        isTrap: PropTypes.bool
      })
    )
  )
};

export default TrapGrid;
