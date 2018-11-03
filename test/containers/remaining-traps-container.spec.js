/* global describe, it */

import { expect } from 'chai';
import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/remaining-traps-container';

describe('Remaining traps container', function () {
  it('Maps state to props', function () {

    // Arrange

    const state = {
      board: [
        [{ isFlagged: true, isTrap: false }, { isFlagged: false, isTrap: true }],
        [{ isFlagged: false, isTrap: true }, { isFlagged: false, isTrap: true }]
      ]
    };

    const immutableState = fromJS(state);

    // Act
    
    const { totalTrapCount, flaggedTrapCount } = mapStateToProps(immutableState);

    // Assert

    expect(totalTrapCount).to.equal(3);
    expect(flaggedTrapCount).to.equal(1);
  });
});
