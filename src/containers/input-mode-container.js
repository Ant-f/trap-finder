import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateInputMode } from '../actions/action-creators';
import * as inputModes from '../input-modes';
import InputMode from '../components/input-mode';

export const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateInputMode }, dispatch);
};

export const mapStateToProps = state => {
  return {
    isFlagInput: state.get('inputMode') === inputModes.FLAG
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputMode);
