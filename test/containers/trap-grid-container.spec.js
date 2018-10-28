/* global describe, it */

import { expect } from 'chai';
import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/trap-grid-container';

describe('TrapGrid container', function () {
  it('Maps state to props', function () {

    // Arrange

    const state = {
      board: 'board',
      gameOver: true
    };

    const immutableState = fromJS(state);

    // Act
    
    const { isGameOver, model } = mapStateToProps(immutableState);

    // Assert

    expect(isGameOver).to.equal(state.gameOver);
    expect(model).to.equal(state.board);
  });
});
