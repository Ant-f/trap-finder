/* global describe, it, require */

import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/grid-cell-container';
import * as inputModes from '../../src/input-modes';
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

  describe('Map state to props', function () {
    it('Maps FLAG to "isFlagInput" true', function () {

      // Arrange

      const state = {
        inputMode: inputModes.FLAG
      };

      const immutableState = fromJS(state);

      // Act
    
      const { isFlagInput } = mapStateToProps(immutableState);

      // Assert

      expect(isFlagInput).to.be.true;
    });

    it('Maps EXPLORE to "isFlagInput" false', function () {

      // Arrange

      const state = {
        inputMode: inputModes.EXPLORE
      };

      const immutableState = fromJS(state);

      // Act
    
      const { isFlagInput } = mapStateToProps(immutableState);

      // Assert

      expect(isFlagInput).to.be.false;
    });

    it('Maps "isGameWon"', function () {

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
});
