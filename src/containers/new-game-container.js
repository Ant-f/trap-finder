import { connect } from 'react-redux';
import * as actions from '../actions/action-creators';
import NewGame from '../components/new-game';

export const mapDispatchToProps = dispatch => {
  return {
    startNewGame: (width, height, trapCount) => dispatch(
      actions.newGame(width, height, trapCount))
  };
};

export const mapStateToProps = state => {
  return {
    defaultHeight: state.get('defaultBoardHeight'),
    defaultTrapCount: state.get('defaultTrapCount'),
    defaultWidth: state.get('defaultBoardWidth')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
