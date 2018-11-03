/* global describe, it, require */

import { expect } from 'chai';
import * as React from 'react';
import Enzyme from '../root-hooks.spec.js';

const styles = {
  trap: 'trap',
  revealed: 'revealed',
  unrevealed: 'unrevealed'
};

const GridCell = require('inject-loader!../../src/components/grid-cell.jsx')({
  '../../stylesheets/trap-grid.scss': styles
}).default;

const getWrapper = props => {
  return Enzyme.shallow(
    <GridCell
      adjacentTrapCount={props.adjacentTrapCount}
      isFlagged={props.isFlagged}
      isGameLost={props.isGameLost}
      isGameWon={props.isGameWon}
      isRevealed={props.isRevealed}
      isTrap={props.isTrap}
      revealCell={props.revealCell}
      toggleFlag={props.toggleFlag} />);
};

describe('<GridCell/>', function () {
  let props = {
    adjacentTrapCount: 0,
    isFlagged: false,
    isGameLost: false,
    isGameWon: false,
    isRevealed: false,
    isTrap: false,
    revealCell: () => { },
    toggleFlag: () => { }
  };

  const flagSelector = 'img[src="images/red-flag.svg"]';

  it('Shows a flag if flagged', function () {
    const wrapper = getWrapper({ ...props, isFlagged: true });
    const image = wrapper.find(flagSelector);
    expect(image).to.have.lengthOf(1);
  });

  it('Does not show a flag if not flagged', function () {
    const wrapper = getWrapper({ ...props, isFlagged: false });
    const image = wrapper.find(flagSelector);
    expect(image).to.have.lengthOf(0);
  });

  describe('When the game is lost', function () {
    this.beforeEach(function () {
      props = { ...props, isGameLost: true };
    });

    const trapSelector = 'img[src="images/bear-trap.svg"]';
    
    it('Shows trap when present', function () {
      const wrapper = getWrapper({ ...props, isTrap: true });
      const image = wrapper.find(trapSelector);
      expect(image).to.have.lengthOf(1);
    });

    it('Does not show trap when not present', function () {
      const wrapper = getWrapper({ ...props, isTrap: false });
      const spans = wrapper.find(trapSelector);
      expect(spans).to.have.lengthOf(0);
    });

    it('Has "trap" class when is trap', function () {
      const wrapper = getWrapper({ ...props, isTrap: true });
      const root = wrapper.first();
      expect(root.hasClass(styles.trap)).to.be.true;
    });

    it('Has "unrevealed" class when is not revealed', function () {
      const wrapper = getWrapper({ ...props, isRevealed: false });
      const root = wrapper.first();
      expect(root.hasClass(styles.unrevealed)).to.be.true;
    });

    it('Has "revealed" class when is revealed', function () {
      const wrapper = getWrapper({ ...props, isRevealed: true });
      const root = wrapper.first();
      expect(root.hasClass(styles.revealed)).to.be.true;
    });

    it('Does not reveal cells or toggle flag', function () {
      const wrapper = getWrapper({
        ...props,
        revealCell: () => { throw new Error('Cell reveal unexpected'); },
        toggleFlag: () => { throw new Error('Flag toggle unexpected'); }
      });

      wrapper.find('div').simulate('click', {});
      wrapper.find('div').simulate('click', { ctrlKey: true });
    });
  });

  describe('When the game is not lost', function () {
    this.beforeEach(function () {
      props = { ...props, isGameLost: false };
    });

    it('Does not show trap when present', function () {
      const wrapper = getWrapper({ ...props, isTrap: true });
      const spans = wrapper.find('span');
      expect(spans).to.have.lengthOf(0);
    });

    it('Does not show trap when not present', function () {
      const wrapper = getWrapper({ ...props, isTrap: false });
      const spans = wrapper.find('span');
      expect(spans).to.have.lengthOf(0);
    });

    it('has "unrevealed" class when is trap', function () {
      const wrapper = getWrapper({ ...props, isTrap: true });
      const root = wrapper.first();
      expect(root.hasClass(styles.unrevealed)).to.be.true;
    });

    describe('When not revealed', function () {
      this.beforeEach(function () {
        props = { ...props, isRevealed: false };
      });

      it('Does not show adjacent trap count', function () {
        const wrapper = getWrapper({
          ...props,
          adjacentTrapCount: 3,
          isTrap: false
        });
      
        const spans = wrapper.find('span');
        expect(spans).to.have.lengthOf(0);
      });

      it('Reveals cell when clicked with no modifiers', function () {
        let cellRevealed = false;

        const wrapper = getWrapper({
          ...props,
          revealCell: () => { cellRevealed = true; },
          toggleFlag: () => { throw new Error('Flag toggle unexpected'); }
        });

        wrapper.find('div').simulate('click', {});
        expect(cellRevealed).to.be.true;
      });
      
      it('Toggles flag when clicked with ctrl key', function () {
        let flagToggled = false;

        const wrapper = getWrapper({
          ...props,
          revealCell: () => { throw new Error('Cell reveal unexpected'); },
          toggleFlag: () => { flagToggled = true; }
        });

        wrapper.find('div').simulate('click', { ctrlKey: true });
        expect(flagToggled).to.be.true;
      });

      it('has "unrevealed" class when is not revealed', function () {
        const wrapper = getWrapper({ ...props, isRevealed: false });
        const root = wrapper.first();
        expect(root.hasClass(styles.unrevealed)).to.be.true;
      });
    });

    describe('When revealed', function () {
      this.beforeEach(function () {
        props = { ...props, isRevealed: true };
      });

      it('Shows adjacent trap count', function () {
        const wrapper = getWrapper({ ...props, adjacentTrapCount: 3, isTrap: false });
        const span = wrapper.find('span');
        const trapCount = Number(span.text().trim());
        expect(Number.isInteger(trapCount)).to.be.true;
      });
        
      it('Does not show adjacent trap count when 0', function () {
        const wrapper = getWrapper({ ...props, adjacentTrapCount: 0, isTrap: false });
        const spans = wrapper.find('span');
        expect(spans).to.have.lengthOf(0);
      });

      it('has "revealed" class when is revealed', function () {
        const wrapper = getWrapper({ ...props, isRevealed: true });
        const root = wrapper.first();
        expect(root.hasClass(styles.revealed)).to.be.true;
      });
    });
  });

  describe('When the game is won', function () {
    this.beforeEach(function () {
      props = { ...props, isGameWon: true };
    });

    it('Does not reveal cells or toggle flag', function () {
      const wrapper = getWrapper({
        ...props,
        revealCell: () => { throw new Error('Cell reveal unexpected'); },
        toggleFlag: () => { throw new Error('Flag toggle unexpected'); }
      });

      wrapper.find('div').simulate('click', {});
      wrapper.find('div').simulate('click', { ctrlKey: true });
    });
  });
});
