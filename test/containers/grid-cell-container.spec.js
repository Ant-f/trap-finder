/* global describe, it */

import { expect } from 'chai';
import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/grid-cell-container';

describe('Grid cell container', function () {
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
