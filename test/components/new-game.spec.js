/* global describe, it */

import * as React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme from '../root-hooks.spec.js';
import NewGame from '../../src/components/new-game';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(chaiEnzyme());
chai.use(sinonChai);

const simulateInput = (inputs, index, value) => {
  inputs.at(index).simulate('change', {
    target: { value }
  });
};

describe('<NewGame />', function () {
  const widthInputIndex = 0;
  const heightInputIndex = 1;
  const trapCountInputIndex = 2;

  it('Is initialised with provided defaults', function () {
    const wrapper = Enzyme.shallow(
      <NewGame
        defaultHeight={3}
        defaultTrapCount={7}
        defaultWidth={5}
        startNewGame={() => { }} />);
    
    const inputs = wrapper.find('input');

    expect(inputs.at(widthInputIndex)).to.have.value('5');
    expect(inputs.at(heightInputIndex)).to.have.value('3');
    expect(inputs.at(trapCountInputIndex)).to.have.value('7');
  });

  it('Has input labels', function () {
    const wrapper = Enzyme.shallow(
      <NewGame
        defaultHeight={3}
        defaultTrapCount={7}
        defaultWidth={5}
        startNewGame={() => { }} />);
  
    const labels = wrapper.find('label');
    
    expect(labels.at(widthInputIndex).text()).to.equal('Width');
    expect(labels.at(heightInputIndex).text()).to.equal('Height');
    expect(labels.at(trapCountInputIndex).text()).to.equal('Traps');
  });

  it('Starts new game with provided specifications', function () {

    // Arrange

    const newGame = sinon.fake();
    const width = 7;
    const height = 5;
    const trapCount = 6;

    const wrapper = Enzyme.shallow(
      <NewGame
        defaultHeight={9}
        defaultTrapCount={10}
        defaultWidth={9}
        startNewGame={newGame} />);
        
    const inputs = wrapper.find('input');

    // Act

    simulateInput(inputs, widthInputIndex, width);
    simulateInput(inputs, heightInputIndex, height);
    simulateInput(inputs, trapCountInputIndex, trapCount);
    wrapper.find('button').simulate('click');
    
    // Assert

    expect(newGame).to.have.been.calledOnceWith(width, height, trapCount);
  });
});
