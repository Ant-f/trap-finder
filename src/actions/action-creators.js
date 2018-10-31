import * as actionTypes from './action-types';

export const revealCellAt = (x, y) => {
  return {
    type: actionTypes.REVEAL_CELL,
    data: { x, y }
  };
};

export const toggleFlagAt = (x, y) => {
  return {
    type: actionTypes.TOGGLE_FLAG,
    data: { x, y }
  };
};
