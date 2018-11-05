import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { revealCellAt, toggleFlagAt } from '../actions/action-creators';
import TrapGrid from '../components/trap-grid.jsx';

export const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { revealCellAt, toggleFlagAt },
    dispatch);
};

export const mapStateToProps = state => {
  return {
    isGameLost: state.get('gameLost'),
    model: state.get('board')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrapGrid);
