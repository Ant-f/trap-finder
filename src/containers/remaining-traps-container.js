import { connect } from 'react-redux';
import RemainingTraps from '../components/remaining-traps';

export const mapStateToProps = state => {
  const boardCells = state.get('board').flatten(1);

  return {
    flaggedTrapCount: boardCells.filter(c => c.get('isFlagged')).size,
    totalTrapCount: boardCells.filter(c => c.get('isTrap')).size
  };
};

export default connect(mapStateToProps)(RemainingTraps);
