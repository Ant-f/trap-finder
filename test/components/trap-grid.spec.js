/* global describe, it */

import { expect } from 'chai';
import { fromJS } from 'immutable';
import * as React from 'react';
import Enzyme from '../root-hooks.spec.js';
import TrapGrid from '../../src/components/trap-grid.jsx';

describe('<TrapGrid/>', function () {
  it('Creates a button for each board cell', function () {
    const model = fromJS([
      [{}, {}],
      [{}, {}]
    ]);

    const wrapper = Enzyme.shallow(<TrapGrid model={model} />);
    const buttons = wrapper.find('button');
    expect(buttons).to.have.lengthOf(4);
  });
});
