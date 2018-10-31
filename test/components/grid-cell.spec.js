/* global describe, it */

import { expect } from 'chai';
import * as React from 'react';
import Enzyme from '../root-hooks.spec.js';
import GridCell, { getClasses } from '../../src/components/grid-cell.jsx';

describe('getClasses', function () {
  const classNames = {
    cell: 'cell',
    revealed: 'revealed',
    trap: 'trap',
    unrevealed: 'unrevealed'
  };

  let gameLost;

  describe('When game is lost', function () {
    this.beforeEach(function () {
      gameLost = true;
    });

    it('returns "trap" when is trap', function () {
      const names = getClasses(classNames, gameLost, false, true);
      expect(names).to.equal('cell trap');
    });

    it('returns "unrevealed" when is not revealed', function () {
      const names = getClasses(classNames, gameLost, false, false);
      expect(names).to.equal('cell unrevealed');
    });

    it('returns "revealed" when is revealed', function () {
      const names = getClasses(classNames, gameLost, true, false);
      expect(names).to.equal('cell revealed');
    });
  });

  describe('When game is not lost', function () {
    this.beforeEach(function () {
      gameLost = false;
    });

    it('returns "unrevealed" when is trap', function () {
      const names = getClasses(classNames, gameLost, false, true);
      expect(names).to.equal('cell unrevealed');
    });

    it('returns "unrevealed" when is not revealed', function () {
      const names = getClasses(classNames, gameLost, false, false);
      expect(names).to.equal('cell unrevealed');
    });

    it('returns "revealed" when is revealed', function () {
      const names = getClasses(classNames, gameLost, true, false);
      expect(names).to.equal('cell revealed');
    });
  });
});

const getWrapper = props => {
  return Enzyme.shallow(
    <GridCell
      adjacentTrapCount={props.adjacentTrapCount}
      isFlagged={props.isFlagged}
      isGameLost={props.isGameLost}
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
      props = {...props, isGameLost: true};
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
    });
  });
});
