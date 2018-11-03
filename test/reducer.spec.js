/* global describe, it, require */

import { fromJS, List } from 'immutable';
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

  it('Returns a default state when action type is unknown', function () {

    // Arrange, Act

    const state = reducer(undefined, {});

    // Assert

    const isGameLost = state.get('gameLost');
    expect(isGameLost).to.be.false;

    const isGameWon = state.get('gameWon');
    expect(isGameWon).to.be.false;
  });

  describe('Toggle-flag action', function () {
    it('Reveals safe board cells', function () {

      // Arrange

      const x = 4;
      const y = 7;
      const action = actions.revealCellAt(x, y);
    
      const state = fromJS({
        board: [],
        gameLost: false
      });
    
      const reveal = sinon.fake.returns(new List());
      const reducerWithInjection = require('inject-loader!../src/reducer')({
        './helpers/cell-revealer': reveal
      }).default;

      // Act

      const updated = reducerWithInjection(state, action);

      // Assert

      expect(reveal).to.have.been.calledOnceWith(x, y, state.get('board'));
      expect(updated.get('gameLost')).to.be.false;
    });

    it('Sets "gameLost" to "true" when revealing a trap', function () {
    
      // Arrange

      const state = fromJS({
        board: [[{
          isTrap: true
        }]],
        gameLost: false,
        gameWon: false
      });

      const action = actions.revealCellAt(0, 0);

      // Act

      const updated = reducer(state, action);

      // Assert

      expect(updated.get('gameLost')).to.be.true;
      expect(updated.get('gameWon')).to.be.false;
      expect(updated.get('timerState')).to.equal(timerStates.STOPPED);
    });

    it('Does not set "gameLost" to "true" when trying to reveal a flagged trap', function () {
    
      // Arrange

      const state = fromJS({
        board: [[{
          isFlagged: true,
          isTrap: true
        }]],
        gameLost: false,
        timerState: timerStates.STARTED
      });

      const action = actions.revealCellAt(0, 0);

      // Act

      const updated = reducer(state, action);

      // Assert

      expect(updated.get('gameLost')).to.be.false;
      expect(updated.get('timerState')).to.equal(timerStates.STARTED);
    });

    it('Does not set "gameWon" to "true" when some non-trap cells are unrevealed', function () {
    
      // Arrange

      const state = fromJS({
        board: [
          [{ adjacentTrapCount: 1, isRevealed: false, isTrap: false }],
          [{ adjacentTrapCount: 0, isRevealed: false, isTrap: true }],
          [{ adjacentTrapCount: 1, isRevealed: false, isTrap: false }]
        ],
        gameLost: false,
        gameWon: false
      });

      const action = actions.revealCellAt(0, 0);

      // Act

      const updated = reducer(state, action);

      // Assert

      expect(updated.get('gameLost')).to.be.false;
      expect(updated.get('gameWon')).to.be.false;
      expect(updated.get('timerState')).to.equal(timerStates.STARTED);
    });

    it('Sets "gameWon" to "true" when all non-trap cells are revealed', function () {
    
      // Arrange

      const state = fromJS({
        board: [
          [{ adjacentTrapCount: 0, isRevealed: false, isTrap: false }],
          [{ adjacentTrapCount: 1, isRevealed: false, isTrap: false }],
          [{ adjacentTrapCount: 0, isRevealed: false, isTrap: true }]
        ],
        gameLost: false,
        gameWon: false
      });

      const action = actions.revealCellAt(0, 0);

      // Act

      const updated = reducer(state, action);

      // Assert

      expect(updated.get('gameLost')).to.be.false;
      expect(updated.get('gameWon')).to.be.true;
      expect(updated.get('timerState')).to.equal(timerStates.STOPPED);
    });
  });

  describe('Toggle-flag action', function () {
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
