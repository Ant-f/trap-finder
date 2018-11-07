import * as actionTypes from './action-types';

export const newGame = (width, height, trapCount) => {
  return {
    type: actionTypes.NEW_GAME,
    data: { width, height, trapCount }
  };
};

export const revealCellAt = (x, y) => {
  return {
    type: actionTypes.REVEAL_CELL,
    data: { x, y }
  };
};

export const setRevealCellStatus = isRevealingCell => {
  return {
    type: actionTypes.SET_REVEAL_CELL_STATUS,
    data: { isRevealingCell }
  };
};

export const toggleFlagAt = (x, y) => {
  return {
    type: actionTypes.TOGGLE_FLAG,
    data: { x, y }
  };
};

export const updateInputMode = mode => {
  return {
    type: actionTypes.UPDATE_INPUT_MODE,
    data: { mode }
  };
};
