import { connect } from 'react-redux';
import GridCell from '../components/grid-cell.jsx';

export const mapStateToProps = state => {
  return {
    isGameWon: state.get('gameWon')
  };
};

export default connect(mapStateToProps)(GridCell);
