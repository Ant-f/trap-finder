/* global describe, it */

import { expect } from 'chai';
import { fromJS } from 'immutable';
import { mapStateToProps } from '../../src/containers/trap-grid-container';

describe('TrapGrid container', function () {
  it('Maps state to props', function () {

    const state = fromJS({
      board: 'board'
    });

    const { model } = mapStateToProps(state);
    expect(model).to.equal(state.board);
  });
});
