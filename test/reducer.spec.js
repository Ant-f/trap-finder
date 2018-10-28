/* global describe, it */

import { expect } from 'chai';
import reducer from '../src/reducer';

describe('Reducer', function() {
  it('Returns a default board when state is undefined', function() {

    // Arrange, Act

    const state = reducer(undefined, {});

    // Assert

    const board = state.get('board');
    expect(board.size).to.equal(9);

    board.map(column => {
      expect(column.size).to.equal(9);
    });
  });
});
