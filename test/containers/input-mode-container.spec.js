/* global describe, it, require */

import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/input-mode-container';
import * as inputModes from '../../src/input-modes';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('input mode container', function () {
  it('Maps dispatch to props', function () {

    // Arrange

    const newValue = 'new value';

    const actions = {
      updateInputMode: sinon.fake()
    };

    const { mapDispatchToProps } =
      require('inject-loader!../../src/containers/input-mode-container')({
        '../actions/action-creators': actions
      });

    const dispatch = () => { };

    // Act

    mapDispatchToProps(dispatch).updateInputMode(newValue);

    // Assert

    expect(actions.updateInputMode).to.have.been.calledOnceWith(newValue);
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
  });
});
