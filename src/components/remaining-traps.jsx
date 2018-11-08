import * as React from 'react';
import * as styles from '../../stylesheets/remaining-traps.scss';
import PropTypes from 'prop-types';

const RemainingTraps = ({ totalTrapCount, flaggedTrapCount }) => (
  <div title="Not yet found traps">
    {
      [...Array(totalTrapCount).keys()].map(i => {
        return <img
          className={`
            ${i < flaggedTrapCount ? null : styles.faded}
            ${styles.image}`}
          key={i}
          src="images/bear-trap.svg" />;
      })
    }
  </div>);

RemainingTraps.propTypes = {
  totalTrapCount: PropTypes.number.isRequired,
  flaggedTrapCount: PropTypes.number.isRequired
};

export default RemainingTraps;
