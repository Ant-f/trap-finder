import generator from './helpers/board-generator';

const defaultState = {
  board: generator.generateBoard(9, 9)
};

export default (state = defaultState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
