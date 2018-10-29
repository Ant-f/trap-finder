/* global describe, it */

import { expect } from 'chai';
import * as React from 'react';
import Enzyme from '../root-hooks.spec.js';
import GridCell from '../../src/components/grid-cell.jsx';

const getWrapper = props => {
  return Enzyme.shallow(
    <GridCell
      adjacentTrapCount={props.adjacentTrapCount}
      isGameOver={props.isGameOver}
      isRevealed={props.isRevealed}
      isTrap={props.isTrap}
      revealCell={() => { }}/>);
};

describe('<GridCell/>', function () {
  let props = {
    adjacentTrapCount: 0,
    isGameOver: false,
    isRevealed: false,
    isTrap: false
  };

  describe('When the game is over', function () {
    this.beforeEach(function () {
      props = {...props, isGameOver: true};
    });

    it('Shows trap when present', function () {
      const wrapper = getWrapper({ ...props, isTrap: true });
      const span = wrapper.find('span');
      expect(span.text().trim()).to.equal('T');
    });

    it('Does not show trap when not present', function () {
      const wrapper = getWrapper({ ...props, isTrap: false });
      const spans = wrapper.find('span');
      expect(spans).to.have.lengthOf(0);
    });
  });

  describe('When the game is not over', function () {
    this.beforeEach(function () {
      props = { ...props, isGameOver: false };
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

    it('Does not show adjacent trap count when not revealed', function () {
      const wrapper = getWrapper({
        ...props,
        adjacentTrapCount: 3,
        isRevealed: false,
        isTrap: false
      });
      
      const spans = wrapper.find('span');
      expect(spans).to.have.lengthOf(0);
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
