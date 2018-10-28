import { connect } from 'react-redux';
import * as actions from '../actions/action-creators';
import TrapGrid from '../components/trap-grid.jsx';

const mapDispatchToProps = dispatch => {
  return {
    revealCell: (x, y) => dispatch(
      actions.revealCell(x, y)),
  };
};

export const mapStateToProps = state => {
  return {
    isGameOver: state.get('gameOver'),
    model: state.get('board')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrapGrid);
