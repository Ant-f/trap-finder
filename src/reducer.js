import BoardGenerator from './helpers/board-generator';

const defaultState = {
  board: new BoardGenerator().generateBoard(9, 9)
};

export default (state = defaultState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
