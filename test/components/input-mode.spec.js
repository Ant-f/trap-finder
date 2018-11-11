/* global describe, it */

import * as inputModes from '../../src/input-modes';
import * as React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme from '../root-hooks.spec.js';
import InputMode from '../../src/components/input-mode';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<InputMode />', function () {
  const checkedAttribute = 'checked';

  it('Has checked attribute when isFlagInput is true', function () {
    const wrapper = Enzyme.shallow(
      <InputMode
        isFlagInput={true}
        updateInputMode={() => { }} />);
    
    const button = wrapper.find('input');
    expect(button).to.have.attr(checkedAttribute);
  });

  it('Does not have checked attribute when isFlagInput is false', function () {
    const wrapper = Enzyme.shallow(
      <InputMode
        isFlagInput={false}
        updateInputMode={() => { }} />);
    
    const button = wrapper.find('input');
    expect(button).not.to.have.attr(checkedAttribute);
  });

  it('Calls "updateMode" with "FLAG" when checked', function () {
    const updateMode = sinon.fake();

    const wrapper = Enzyme.shallow(
      <InputMode
        isFlagInput={false}
        updateInputMode={updateMode} />);
    
    wrapper.find('input').simulate('change', {
      target: {
        checked: true
      }
    });

    expect(updateMode).to.have.been.calledOnceWith(inputModes.FLAG);
  });

  it('Calls "updateMode" with "EXPLORE" when unchecked', function () {
    const updateMode = sinon.fake();

    const wrapper = Enzyme.shallow(
      <InputMode
        isFlagInput={true}
        updateInputMode={updateMode} />);
    
    wrapper.find('input').simulate('change', {
      target: {
        checked: false
      }
    });

    expect(updateMode).to.have.been.calledOnceWith(inputModes.EXPLORE);
  });
});
