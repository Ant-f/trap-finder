/* global describe, it */

import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/smiley-container';
import { expect } from 'chai';

describe('Smiley container', function () {
  it('Maps state to props', function () {

    // Arrange

    const state = {
      gameLost: true,
      gameWon: true,
      isRevealingCell: true
    };

    const immutableState = fromJS(state);

    // Act
  
    const {
      gameLost,
      gameWon,
      isRevealingCell } = mapStateToProps(immutableState);

    // Assert

    expect(gameLost).to.equal(state.isGameLost);
    expect(gameWon).to.equal(state.isGameWon);
    expect(isRevealingCell).to.equal(state.isRevealingCell);
  });
});
