import { connect } from 'react-redux';
import * as actions from '../actions/action-creators';
import TrapGrid from '../components/trap-grid.jsx';

const mapDispatchToProps = dispatch => {
  return {
    revealCellAt: (x, y) => dispatch(
      actions.revealCellAt(x, y)),
    toggleFlagAt: (x, y) => dispatch(
      actions.toggleFlagAt(x, y))
  };
};

export const mapStateToProps = state => {
  return {
    isGameLost: state.get('gameLost'),
    model: state.get('board')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrapGrid);
