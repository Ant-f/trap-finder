/* global beforeEach, describe, it, require */

import * as React from 'react';
import { expect } from 'chai';
import Enzyme from '../root-hooks.spec.js';

const loseSelector = 'img[src="images/lose-face.svg"]';
const neutralSelector = 'img[src="images/neutral-face.svg"]';
const suspenseSelector = 'img[src="images/suspense-face.svg"]';
const winSelector = 'img[src="images/win-face.svg"]';

const styles = {
  hidden: 'hidden'
};

const Smiley = require('inject-loader!../../src/components/smiley.jsx')({
  '../../stylesheets/smiley.scss': styles
}).default;

const getWrapper = props => {
  return Enzyme.shallow(
    <Smiley
      isGameLost={props.isGameLost}
      isGameWon={props.isGameWon}
      isRevealingCell={props.isRevealingCell} />);
};

const assertNotHidden = (wrapper, notHiddenSelector) => {
  const selectors = [loseSelector, neutralSelector, suspenseSelector, winSelector];

  selectors.forEach(s => {
    expect(wrapper.find(s).hasClass(styles.hidden), s).to.equal(s !== notHiddenSelector);
  });
};

describe('<Smiley />', function () {
  let props;

  beforeEach(function () {
    props = {
      isGameLost: false,
      isGameWon: false,
      isRevealingCell: false
    };
  });

  it('Shows a lose face when game is lost', function () {
    const wrapper = getWrapper({ ...props, isGameLost: true });
    assertNotHidden(wrapper, loseSelector);
  });

  it('Shows a win face when game is won', function () {
    const wrapper = getWrapper({ ...props, isGameWon: true });
    assertNotHidden(wrapper, winSelector);
  });

  describe('When game is not over', function () {
    beforeEach(function () {
      props.isGameLost = false;
      props.isGameWon = false;
    });
    
    it('Shows a neutral face when not revealing cell', function () {
      const wrapper = getWrapper({ ...props, isRevealingCell: false });
      assertNotHidden(wrapper, neutralSelector);
    });

    it('Shows a suspense face when revealing cell', function () {
      const wrapper = getWrapper({ ...props, isRevealingCell: true });
      assertNotHidden(wrapper, suspenseSelector);
    });
  });
});
