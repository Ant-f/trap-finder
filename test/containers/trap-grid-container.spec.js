/* global describe, it */

import { expect } from 'chai';
import { mapStateToProps } from '../../src/containers/trap-grid-container';

describe('TrapGrid container', function () {
  it('Maps state to props', function () {

    const state = {
      board: 'board'
    };

    const { model } = mapStateToProps(state);
    expect(model).to.equal(state.board);
  });
});
