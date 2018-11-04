/* global describe, it, require */

import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/new-game-container';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('New game container', function () {
  it('Maps dispatch to props', function () {

    // Arrange

    const height = 5;
    const trapCount = 10;
    const width = 7;

    const actions = {
      newGame: sinon.fake()
    };

    const { mapDispatchToProps } =
      require('inject-loader!../../src/containers/new-game-container')({
        '../actions/action-creators': actions
      });

    const dispatch = () => { };

    // Act

    mapDispatchToProps(dispatch).startNewGame(width, height, trapCount);

    // Assert

    expect(actions.newGame).to.have.been.calledOnceWith(width, height, trapCount);
  });

  it('Maps state to props', function () {

    // Arrange

    const state = {
      defaultBoardHeight: 5,
      defaultTrapCount: 10,
      defaultBoardWidth: 7
    };

    const immutableState = fromJS(state);

    // Act
    
    const {
      defaultHeight,
      defaultTrapCount,
      defaultWidth
    } = mapStateToProps(immutableState);

    // Assert

    expect(defaultHeight).to.equal(state.defaultBoardHeight);
    expect(defaultTrapCount).to.equal(state.defaultTrapCount);
    expect(defaultWidth).to.equal(state.defaultBoardWidth);
  });
});
