/* global describe, it, require */

import { fromJS } from 'immutable';
import * as actions from '../src/actions/action-creators';
import * as timerStates from '../src/components/timer-states';
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

    const cells = board.flatten(1);
    const traps = cells.filter(c => c.get('isTrap'));
    expect(traps.size).to.equal(10);
  });

  it('Reveals safe board cells', function () {

    // Arrange

    const x = 4;
    const y = 7;
    const action = actions.revealCellAt(x, y);
    
    const state = fromJS({
      board: [],
      gameLost: false
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
    expect(updated.get('gameLost')).to.be.false;
    expect(updated.get('timerState')).to.equal(timerStates.STARTED);
  });

  it('Ends game when revealing a trap', function () {
    
    // Arrange

    const state = fromJS({
      board: [[{
        isTrap: true
      }]],
      gameLost: false
    });

    const action = actions.revealCellAt(0, 0);

    // Act

    const updated = reducer(state, action);

    // Assert

    expect(updated.get('gameLost')).to.be.true;
    expect(updated.get('timerState')).to.equal(timerStates.STOPPED);
  });

  describe('Toggle-flag action', () => {
    it('Sets flag on unflagged and unrevealed cell', () => {
      // Arrange

      const state = fromJS({
        board: [[{
          isRevealed: false,
          isFlagged: false
        }]]
      });

      const action = actions.toggleFlagAt(0, 0);

      // Act

      const updated = reducer(state, action);

      // Assert

      expect(updated.getIn(['board', 0, 0, 'isFlagged'])).to.be.true;
      expect(updated.get('timerState')).to.equal(timerStates.STARTED);
    });

    it('Does not set flag on unflagged and revealed cell', () => {
      // Arrange

      const state = fromJS({
        board: [[{
          isRevealed: true,
          isFlagged: false
        }]]
      });

      const action = actions.toggleFlagAt(0, 0);

      // Act

      const updated = reducer(state, action);

      // Assert

      expect(updated.getIn(['board', 0, 0, 'isFlagged'])).to.be.false;
    });

    it('Unsets flag on flagged cell', () => {
      // Arrange

      const state = fromJS({
        board: [[{
          isFlagged: true
        }]]
      });

      const action = actions.toggleFlagAt(0, 0);

      // Act

      const updated = reducer(state, action);

      // Assert

      expect(updated.getIn(['board', 0, 0, 'isFlagged'])).to.be.false;
    });
  });
});
