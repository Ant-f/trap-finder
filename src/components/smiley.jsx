import * as React from 'react';
import * as styles from '../../stylesheets/smiley.scss';
import PropTypes from 'prop-types';

const Smiley = ({ isGameLost, isGameWon, isRevealingCell }) => (
  <div className={styles.container}>
    <img className={styles.image} src="images/smiley-base.svg" />
      
    <img
      className={`
          ${styles.image}
          ${styles.hideable}
          ${isRevealingCell || isGameLost || isGameWon ? styles.hidden : null}`}
      src="images/neutral-face.svg" />
      
    <img
      className={`
          ${styles.image}
          ${styles.hideable}
          ${!isRevealingCell || isGameLost || isGameWon ? styles.hidden : null}`}
      src="images/suspense-face.svg" />
      
    <img
      className={`
          ${styles.image}
          ${styles.hideable}
          ${isGameWon ? null : styles.hidden}`}
      src="images/win-face.svg" />
      
    <img
      className={`
          ${styles.image}
          ${styles.hideable}
          ${isGameLost ? null : styles.hidden}`}
      src="images/lose-face.svg" />
  </div>);

Smiley.propTypes = {
  isGameLost: PropTypes.bool.isRequired,
  isGameWon: PropTypes.bool.isRequired,
  isRevealingCell: PropTypes.bool.isRequired
};

export default Smiley;
