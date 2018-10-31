/* global describe, it */

import { expect } from 'chai';
import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/trap-grid-container';

describe('TrapGrid container', function () {
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
