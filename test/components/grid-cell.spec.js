/* global describe, it */

import { expect } from 'chai';
import * as React from 'react';
import Enzyme from '../root-hooks.spec.js';
import GridCell from '../../src/components/grid-cell.jsx';

describe('<GridCell/>', function () {
  describe('When the game is over', function () {
    it('Shows trap when present', function () {
      const wrapper = Enzyme.shallow(<GridCell isGameOver={true} isTrap={true} />);
      const span = wrapper.find('span');
      expect(span.text().trim()).to.equal('T');
    });

    it('Does not show trap when not present', function () {
      const wrapper = Enzyme.shallow(<GridCell isGameOver={true} isTrap={false} />);
      const spans = wrapper.find('span');
      expect(spans).to.have.lengthOf(0);
    });
  });

  describe('When the game is not over', function () {
    it('Does not show trap when present', function () {
      const wrapper = Enzyme.shallow(<GridCell isGameOver={false} isTrap={true} />);
      const spans = wrapper.find('span');
      expect(spans).to.have.lengthOf(0);
    });

    it('Does not show trap when not present', function () {
      const wrapper = Enzyme.shallow(<GridCell isGameOver={false} isTrap={false} />);
      const spans = wrapper.find('span');
      expect(spans).to.have.lengthOf(0);
    });

    it('Does not show adjacent trap count when not revealed', function () {
      const wrapper = Enzyme.shallow(
        <GridCell
          adjacentTrapCount={3}
          isGameOver={false}
          isRevealed={false}
          isTrap={false} />);
      
      const spans = wrapper.find('span');
      expect(spans).to.have.lengthOf(0);
    });

    describe('When revealed', function () {
      it('Shows adjacent trap count', function () {
        const wrapper = Enzyme.shallow(
          <GridCell
            adjacentTrapCount={3}
            isGameOver={false}
            isRevealed={true}
            isTrap={false} />);
          
        const span = wrapper.find('span');
        const trapCount = Number(span.text().trim());
        expect(Number.isInteger(trapCount)).to.be.true;
      });
        
      it('Does not show adjacent trap count when 0', function () {
        const wrapper = Enzyme.shallow(
          <GridCell
            adjacentTrapCount={0}
            isGameOver={false}
            isRevealed={true}
            isTrap={false} />);
          
        const spans = wrapper.find('span');
        expect(spans).to.have.lengthOf(0);
      });
    });
  });
});
