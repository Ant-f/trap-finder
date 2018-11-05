import { connect } from 'react-redux';
import * as actions from '../actions/action-creators';
import Smiley from '../components/smiley.jsx';

export const mapDispatchToProps = dispatch => {
  return {
    setRevealCellStatus: isRevealingCell => dispatch(
      actions.setRevealCellStatus(isRevealingCell))
  };
};

export const mapStateToProps = state => {
  return {
    isGameLost: state.get('gameLost'),
    isGameWon: state.get('gameWon'),
    isRevealingCell: state.get('isRevealingCell'),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Smiley);
