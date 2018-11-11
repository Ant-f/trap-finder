/* global describe, it, require */

import { expect } from 'chai';
import * as React from 'react';
import Enzyme from '../root-hooks.spec.js';

const styles = {
  cell: 'cell',
  faded: 'faded',
  flagged: 'flagged',
  trap: 'trap',
  trapCount: 'trapCount',
  revealed: 'revealed',
  unrevealed: 'unrevealed'
};

const GridCell = require('inject-loader!../../src/components/grid-cell')({
  '../../stylesheets/trap-grid': styles,
  '../../stylesheets/trap-count-colours': styles,
  '../../images/bear-trap': 'bear-trap',
  '../../images/red-cross': 'red-cross',
  '../../images/red-flag': 'red-flag',
}).default;

const getWrapper = props => {
  return Enzyme.shallow(
    <GridCell
      adjacentTrapCount={props.adjacentTrapCount}
      isFlagInput={props.isFlagInput}
      isFlagged={props.isFlagged}
      isGameLost={props.isGameLost}
      isGameWon={props.isGameWon}
      isRevealed={props.isRevealed}
      isTrap={props.isTrap}
      revealCell={props.revealCell}
      setRevealCellStatus={props.setRevealCellStatus}
      toggleFlag={props.toggleFlag} />);
};

describe('<GridCell/>', function () {
  let props = {
    adjacentTrapCount: 0,
    isFlagInput: false,
    isFlagged: false,
    isGameLost: false,
    isGameWon: false,
    isRevealed: false,
    isTrap: false,
    revealCell: () => { },
    setRevealCellStatus: () => { },
    toggleFlag: () => { }
  };

  const crossSelector = 'img[src="red-cross"]';
  const flagSelector = 'img[src="red-flag"]';

  it('Shows a flag if flagged', function () {
    const wrapper = getWrapper({ ...props, isFlagged: true });
    const image = wrapper.find(flagSelector);
    expect(image).to.have.lengthOf(1);
    expect(image.hasClass(styles.faded)).to.be.false;
  });

  it('Does not show a flag if not flagged', function () {
    const wrapper = getWrapper({ ...props, isFlagged: false });
    const image = wrapper.find(flagSelector);
    expect(image).to.have.lengthOf(0);
  });

  it('Does not show a cross', function () {
    const wrapper = getWrapper(props);
    const image = wrapper.find(crossSelector);
    expect(image).to.have.lengthOf(0);
  });

  it('Sets state to indicate revealing a cell on mouse-down event', function () {
    let isRevealingCell;

    const wrapper = getWrapper({
      ...props,
      setRevealCellStatus: newValue => isRevealingCell = newValue
    });

    wrapper.find(`.${styles.cell}`).simulate('mouseDown', {});
    expect(isRevealingCell).to.be.true;
  });

  it('Sets state to indicate not revealing a cell on mouse-up event', function () {
    let isRevealingCell;

    const wrapper = getWrapper({
      ...props,
      setRevealCellStatus: newValue => isRevealingCell = newValue
    });

    wrapper.find(`.${styles.cell}`).simulate('mouseUp', {});
    expect(isRevealingCell).to.be.false;
  });

  it('Does not set state relating to revealing cell when setting flag', function () {
    const wrapper = getWrapper({
      ...props,
      setRevealCellStatus: () => { throw new Error('State update unexpected'); }
    });

    wrapper.find(`.${styles.cell}`).simulate('mouseDown', { ctrlKey: true });
    wrapper.find(`.${styles.cell}`).simulate('mouseUp', { ctrlKey: true });
  });

  describe('When the game is lost', function () {
    this.beforeEach(function () {
      props = { ...props, isGameLost: true };
    });

    const trapSelector = 'img[src="bear-trap"]';
    
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

    it('Has "trap" class when is trap and not flagged', function () {
      const wrapper = getWrapper({ ...props, isFlagged: false, isTrap: true });
      const root = wrapper.first();
      expect(root.hasClass(styles.trap)).to.be.true;
    });

    it('has "flagged" class when is trap and flagged', function () {
      const wrapper = getWrapper({ ...props, isFlagged: true, isTrap: true });
      const root = wrapper.first();
      expect(root.hasClass(styles.flagged)).to.be.true;
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

    it('Does not reveal or toggle flag', function () {
      const wrapper = getWrapper({
        ...props,
        revealCell: () => { throw new Error('Cell reveal unexpected'); },
        toggleFlag: () => { throw new Error('Flag toggle unexpected'); }
      });

      wrapper.find(`.${styles.cell}`).simulate('click', {});
      wrapper.find(`.${styles.cell}`).simulate('click', { ctrlKey: true });
    });

    it('Shows a cross over a flag if flagged and trap is not present', function () {
      const wrapper = getWrapper({ ...props, isFlagged: true, isTrap: false });
      
      const flagImage = wrapper.find(flagSelector);
      expect(flagImage.hasClass(styles.faded)).to.be.true;
      
      const crossImage = wrapper.find(crossSelector);
      expect(crossImage).to.have.lengthOf(1);
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

    it('Has "unrevealed" class when is trap', function () {
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

        wrapper.find(`.${styles.cell}`).simulate('click', {});
        expect(cellRevealed).to.be.true;
      });
      
      it('Toggles flag when clicked with ctrl key', function () {
        let flagToggled = false;

        const wrapper = getWrapper({
          ...props,
          revealCell: () => { throw new Error('Cell reveal unexpected'); },
          toggleFlag: () => { flagToggled = true; }
        });

        wrapper.find(`.${styles.cell}`).simulate('click', { ctrlKey: true });
        expect(flagToggled).to.be.true;
      });

      it('Toggles flag when clicked and "isFlagInput" is true', function () {
        let flagToggled = false;

        const wrapper = getWrapper({
          ...props,
          isFlagInput: true,
          revealCell: () => { throw new Error('Cell reveal unexpected'); },
          toggleFlag: () => { flagToggled = true; }
        });

        wrapper.find(`.${styles.cell}`).simulate('click', {});
        expect(flagToggled).to.be.true;
      });

      it('has "unrevealed" class when is not revealed and not flagged', function () {
        const wrapper = getWrapper({ ...props, isFlagged: false, isRevealed: false });
        const root = wrapper.first();
        expect(root.hasClass(styles.unrevealed)).to.be.true;
      });

      it('has "flagged" class when is not revealed and flagged', function () {
        const wrapper = getWrapper({ ...props, isFlagged: true, isRevealed: false });
        const root = wrapper.first();
        expect(root.hasClass(styles.flagged)).to.be.true;
      });
    });

    describe('When revealed', function () {
      this.beforeEach(function () {
        props = { ...props, isRevealed: true };
      });

      it('Shows adjacent trap count', function () {
        const wrapper = getWrapper({ ...props, adjacentTrapCount: 3, isTrap: false });
        const element = wrapper.find(`.${styles.trapCount}`);
        const trapCount = Number(element.text().trim());
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

    it('Does not reveal or toggle flag', function () {
      const wrapper = getWrapper({
        ...props,
        revealCell: () => { throw new Error('Cell reveal unexpected'); },
        toggleFlag: () => { throw new Error('Flag toggle unexpected'); }
      });

      wrapper.find(`.${styles.cell}`).simulate('click', {});
      wrapper.find(`.${styles.cell}`).simulate('click', { ctrlKey: true });
    });
  });
});
