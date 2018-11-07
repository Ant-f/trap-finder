import { fromJS } from 'immutable';
import * as actionTypes from './actions/action-types';
import * as inputModes from './input-modes';
import * as timerStates from './components/timer-states';
import generator from './helpers/board-generator';
import reveal from './helpers/cell-revealer';

const defaultHeight = 9;
const defaultTrapCount = 10;
const defaultWidth = 9;

const defaultState = fromJS({
  board: generator.generateBoard(defaultWidth, defaultHeight, defaultTrapCount),
  defaultBoardHeight: defaultHeight,
  defaultTrapCount: defaultTrapCount,
  defaultBoardWidth: defaultWidth,
  gameLost: false,
  gameWon: false,
  inputMode: inputModes.EXPLORE,
  isRevealingCell: false,
  timerState: timerStates.RESET
});

/* eslint indent: 'off' */

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.NEW_GAME: {
      const { width, height, trapCount } = action.data;

      const newState =
        defaultState.set('board', generator.generateBoard(width, height, trapCount));
      
      return newState;
    }

    case actionTypes.REVEAL_CELL: {
      const { x, y } = action.data;
      const isFlagged = state.getIn(['board', x, y, 'isFlagged']);
      
      if (isFlagged) {
        return state;
      }

      const isTrap = state.getIn(['board', x, y, 'isTrap']);

      if (isTrap) {
        return state.withMutations(s => s
          .set('gameLost', true)
          .set('timerState', timerStates.STOPPED));
      }

      const updatedBoard = reveal(x, y, state.get('board'));

      const isWon = updatedBoard.flatten(1)
        .filter(c => !c.get('isTrap'))
        .every(c => c.get('isRevealed'));

      const updatedState = state.withMutations(s => s
        .set('gameWon', isWon)
        .set('board', updatedBoard)
        .set('timerState', isWon
          ? timerStates.STOPPED
          : timerStates.STARTED));
      
      return updatedState;
    }

    case actionTypes.SET_REVEAL_CELL_STATUS: {
      return state.set('isRevealingCell', action.data.isRevealingCell);
    }

    case actionTypes.TOGGLE_FLAG: {
      const { x, y } = action.data;
      const isRevealed = !!state.getIn(['board', x, y, 'isRevealed']);

      if (isRevealed) {
        return state;
      }

      const isFlagged = !!state.getIn(['board', x, y, 'isFlagged']);
      
      const updated = state.withMutations(s => s
        .setIn(['board', x, y, 'isFlagged'], !isFlagged)
        .set('timerState', timerStates.STARTED));
      
      return updated;
    }
      
    case actionTypes.UPDATE_INPUT_MODE: {
      return state.set('inputMode', action.data.mode);
    }

    default: {
      return state;
    }
  }
};
