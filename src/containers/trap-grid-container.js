import { connect } from 'react-redux';
import TrapGrid from '../components/trap-grid.jsx';

export const mapStateToProps = state => {
  return {
    model: state.board
  };
};

export default connect(mapStateToProps)(TrapGrid);
