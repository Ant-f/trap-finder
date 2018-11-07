import { connect } from 'react-redux';
import * as actions from '../actions/action-creators';
import * as inputModes from '../input-modes';
import GridCell from '../components/grid-cell.jsx';

export const mapDispatchToProps = dispatch => {
  return {
    setRevealCellStatus: isRevealingCell => dispatch(
      actions.setRevealCellStatus(isRevealingCell))
  };
};

export const mapStateToProps = state => {
  return {
    isFlagInput: state.get('inputMode') === inputModes.FLAG,
    isGameWon: state.get('gameWon')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridCell);
