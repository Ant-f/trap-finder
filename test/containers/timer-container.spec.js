/* global describe, it */

import { expect } from 'chai';
import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/timer-container';

describe('Timer container', function () {
  it('Maps state to props', function () {

    // Arrange

    const state = { timerState: 'timer state' };
    const immutableState = fromJS(state);

    // Act
    
    const { timerState } = mapStateToProps(immutableState);

    // Assert

    expect(timerState).to.equal(state.timerState);
  });
});
