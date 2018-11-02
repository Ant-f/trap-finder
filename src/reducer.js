import { fromJS } from 'immutable';
import * as actionTypes from './actions/action-types';
import * as timerStates from './components/timer-states';
import generator from './helpers/board-generator';
import reveal from './helpers/cell-revealer';

const defaultState = fromJS({
  board: generator.generateBoard(9, 9, 10),
  gameLost: false
});

/* eslint indent: 'off' */

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.REVEAL_CELL: {
      const { x, y } = action.data;
      const isTrap = state.getIn(['board', x, y, 'isTrap']);

      if (isTrap) {
        return state.withMutations(s => s
          .set('gameLost', true)
          .set('timerState', timerStates.STOPPED));  
      }

      const updatedBoard = reveal(x, y, state.get('board'));

      const updatedState = state.withMutations(s => s
        .set('board', updatedBoard)
        .set('timerState', timerStates.STARTED));
      
      return updatedState;
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

    default: {
      return state;
    }
  }
};
