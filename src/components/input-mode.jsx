import * as React from 'react';
import * as inputModes from '../input-modes';
import PropTypes from 'prop-types';

const updateMode = (e, updateInputMode) => {
  const value = e.target.checked
    ? inputModes.FLAG
    : inputModes.EXPLORE;
  
  updateInputMode(value);
};

const InputMode = ({ isFlagInput, updateInputMode }) => (
  <input
    checked={isFlagInput}
    onChange={e => { updateMode(e, updateInputMode); }}
    type="checkbox" />);

InputMode.propTypes = {
  isFlagInput: PropTypes.bool.isRequired,
  updateInputMode: PropTypes.func.isRequired
};

export default InputMode;
