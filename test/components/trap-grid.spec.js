/* global describe, it */

import { expect } from 'chai';
import { fromJS } from 'immutable';
import * as React from 'react';
import Enzyme from '../root-hooks.spec.js';
import TrapGrid from '../../src/components/trap-grid.jsx';

const cell = () => ({
  adjacentTrapCount: 0,
  isRevealed: false,
  isTrap: false
});

describe('<TrapGrid/>', function () {
  it('Creates a button for each board cell', function () {
    const model = fromJS([
      [cell(), cell()],
      [cell(), cell()]
    ]);

    const wrapper = Enzyme.shallow(
      <TrapGrid
        isGameOver={false}
        model={model}
        revealCellAt={() => { }} />);
    
    const cells = wrapper.find('GridCell');
    expect(cells).to.have.lengthOf(4);
  });
});
