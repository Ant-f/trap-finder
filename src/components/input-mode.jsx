import * as React from 'react';
import * as inputModes from '../input-modes';
import * as styles from '../../stylesheets/input-mode.scss';
import PropTypes from 'prop-types';

const updateMode = (e, updateInputMode) => {
  const value = e.target.checked
    ? inputModes.FLAG
    : inputModes.EXPLORE;
  
  updateInputMode(value);
};

const InputMode = ({ isFlagInput, updateInputMode }) => (
  <label
    className={styles.toggleButton}
    title="Switch between revealing squares/setting flags. Ctrl+click also sets a flag">

    <input
      checked={isFlagInput}
      onChange={e => { updateMode(e, updateInputMode); }}
      type="checkbox" />
    
    <div className={styles.activeIndicator} />
    
    <img src="../../images/red-flag.svg" />
  </label>);

InputMode.propTypes = {
  isFlagInput: PropTypes.bool.isRequired,
  updateInputMode: PropTypes.func.isRequired
};

export default InputMode;
