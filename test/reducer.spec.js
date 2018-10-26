/* global describe, it */

import { expect } from 'chai';
import reducer from '../src/reducer';

describe('Reducer', function() {
  it('returns a default board when state is undefined', function() {

    // Arrange, Act

    const state = reducer(undefined, {});

    // Assert

    expect(state.board.length).to.equal(9);

    state.board.forEach(column => {
      expect(column.length).to.equal(9);
    });
  });
});
