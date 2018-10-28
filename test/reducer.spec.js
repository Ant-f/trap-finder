/* global describe, it, require */

import { fromJS } from 'immutable';
import * as actions from '../src/actions/action-creators';
import chai, { expect } from 'chai';
import reducer from '../src/reducer';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('Reducer', function () {
  it('Returns a default board when state is undefined', function () {

    // Arrange, Act

    const state = reducer(undefined, {});

    // Assert

    const board = state.get('board');
    expect(board.size).to.equal(9);

    board.map(column => {
      expect(column.size).to.equal(9);
    });
  });

  it('Reveals safe board cells', function () {

    // Arrange

    const x = 4;
    const y = 7;
    const action = actions.revealCellAt(x, y);
    
    const state = fromJS({
      board: [],
      gameOver: false
    });
    
    const reveal = sinon.fake();
    const reducerModule = require('inject-loader!../src/reducer');
    const reducerWithInjection = reducerModule({
      './helpers/cell-revealer': reveal
    }).default;

    // Act

    const updated = reducerWithInjection(state, action);

    // Assert

    expect(reveal).to.have.been.calledOnceWith(x, y, state.get('board'));
    expect(updated.getIn(['gameOver'])).to.be.false;
  });

  it('Ends game when revealing a trap', function () {
    
    // Arrange

    const state = fromJS({
      board: [[{
        isTrap: true
      }]],
      gameOver: false
    });

    const action = actions.revealCellAt(0, 0);

    // Act

    const updated = reducer(state, action);

    // Assert

    expect(updated.getIn(['gameOver'])).to.be.true;
  });
});
