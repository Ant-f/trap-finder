/* global describe, it, require */

import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/grid-cell-container';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('Grid cell container', function () {
  it('Maps dispatch to props', function () {

    // Arrange

    const actions = {
      setRevealCellStatus: sinon.fake()
    };

    const { mapDispatchToProps } =
      require('inject-loader!../../src/containers/grid-cell-container')({
        '../actions/action-creators': actions
      });

    const dispatch = () => { };

    // Act

    mapDispatchToProps(dispatch).setRevealCellStatus(true);

    // Assert

    expect(actions.setRevealCellStatus).to.have.been.calledOnceWith(true);
  });

  it('Maps state to props', function () {

    // Arrange

    const state = {
      gameWon: true
    };

    const immutableState = fromJS(state);

    // Act
    
    const { isGameWon } = mapStateToProps(immutableState);

    // Assert

    expect(isGameWon).to.equal(state.gameWon);
  });
});
