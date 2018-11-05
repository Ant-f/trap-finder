/* global describe, it, require */

import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/trap-grid-container';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('TrapGrid container', function () {
  it('Maps dispatch to props', function () {

    // Arrange
    
    const actions = {
      revealCellAt: sinon.fake(),
      toggleFlagAt: sinon.fake(),
    };

    const { mapDispatchToProps } =
      require('inject-loader!../../src/containers/trap-grid-container')({
        '../actions/action-creators': actions
      });

    const dispatch = () => { };

    // Act

    mapDispatchToProps(dispatch).revealCellAt(1, 2);
    mapDispatchToProps(dispatch).toggleFlagAt(3, 4);

    // Assert

    expect(actions.revealCellAt).to.have.been.calledOnceWith(1, 2);
    expect(actions.toggleFlagAt).to.have.been.calledOnceWith(3, 4);
  });

  it('Maps state to props', function () {

    // Arrange

    const state = {
      board: 'board',
      gameLost: true
    };

    const immutableState = fromJS(state);

    // Act
    
    const { isGameLost, model } = mapStateToProps(immutableState);

    // Assert

    expect(isGameLost).to.equal(state.gameLost);
    expect(model).to.equal(state.board);
  });
});
