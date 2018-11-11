import * as React from 'react';
import * as styles from '../../stylesheets/smiley';
import loseFace from '../../images/lose-face';
import neutralFace from '../../images/neutral-face';
import PropTypes from 'prop-types';
import smileyBase from '../../images/smiley-base';
import suspenseFace from '../../images/suspense-face';
import winFace from '../../images/win-face';

const Smiley = ({ isGameLost, isGameWon, isRevealingCell }) => (
  <div className={styles.container}>
    <img src={smileyBase} />
      
    <img
      className={`${isRevealingCell || isGameLost || isGameWon ? styles.hidden : null}`}
      src={neutralFace} />
      
    <img
      className={`${!isRevealingCell || isGameLost || isGameWon ? styles.hidden : null}`}
      src={suspenseFace} />
      
    <img
      className={`${isGameWon ? null : styles.hidden}`}
      src={winFace} />
      
    <img
      className={`${isGameLost ? null : styles.hidden}`}
      src={loseFace} />
  </div>);

Smiley.propTypes = {
  isGameLost: PropTypes.bool.isRequired,
  isGameWon: PropTypes.bool.isRequired,
  isRevealingCell: PropTypes.bool.isRequired
};

export default Smiley;
