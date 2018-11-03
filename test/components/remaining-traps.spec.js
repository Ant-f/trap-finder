/* global describe, it, require */

import * as React from 'react';
import { expect } from 'chai';
import Enzyme from '../root-hooks.spec.js';

const styles = {
  faded: 'faded'
};

const RemainingTraps = require('inject-loader!../../src/components/remaining-traps.jsx')({
  '../../stylesheets/remaining-traps.scss': styles
}).default;

describe('<RemainingTraps />', function () {
  const imageSelector = 'img[src="images/bear-trap.svg"]';

  it('Displays the correct number of traps', function () {
    const wrapper = Enzyme.shallow(
      <RemainingTraps totalTrapCount={10} flaggedTrapCount={0} />);
    
    const images = wrapper.find(imageSelector);
    expect(images).to.have.lengthOf(10);
  });

  it('Styles unflagged traps as faded', function () {
    const wrapper = Enzyme.shallow(
      <RemainingTraps totalTrapCount={4} flaggedTrapCount={2} />);
    
    const images = wrapper.find(imageSelector);
    expect(images.at(0).hasClass(styles.faded), '0').to.be.false;
    expect(images.at(1).hasClass(styles.faded), '1').to.be.false;
    expect(images.at(2).hasClass(styles.faded), '2').to.be.true;
    expect(images.at(3).hasClass(styles.faded), '3').to.be.true;
  });
});
