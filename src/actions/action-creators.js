import * as actionTypes from './action-types';

export const revealCellAt = (x, y) => {
  return {
    type: actionTypes.REVEAL_CELL,
    data: { x, y }
  };
};
