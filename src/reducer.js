import { fromJS } from 'immutable';
import * as actionTypes from './actions/action-types';
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
        return state.setIn(['gameLost'], true);
      }

      const updatedBoard = reveal(x, y, state.get('board'));
      const updatedState = state.set('board', updatedBoard);
      return updatedState;
    }

    case actionTypes.TOGGLE_FLAG: {
      const { x, y } = action.data;
      const isRevealed = !!state.getIn(['board', x, y, 'isRevealed']);

      if (isRevealed) {
        return state;
      }

      const isFlagged = !!state.getIn(['board', x, y, 'isFlagged']);
      const updated = state.setIn(['board', x, y, 'isFlagged'], !isFlagged);
      return updated;
    }

    default: {
      return state;
    }
  }
};
