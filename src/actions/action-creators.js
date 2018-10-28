import * as actionTypes from './action-types';

export const revealCell = (x, y) => {
  return {
    type: actionTypes.REVEAL_CELL,
    data: { x, y }
  };
};
