import { connect } from 'react-redux';
import * as actions from '../actions/action-creators';
import GridCell from '../components/grid-cell.jsx';

export const mapDispatchToProps = dispatch => {
  return {
    setRevealCellStatus: isRevealingCell => dispatch(
      actions.setRevealCellStatus(isRevealingCell))
  };
};

export const mapStateToProps = state => {
  return {
    isGameWon: state.get('gameWon')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridCell);
