/* global describe, it, require */

import { expect } from 'chai';
import * as React from 'react';
import Enzyme from '../root-hooks.spec.js';
import ContentRoot from '../../src/components/content-root.jsx';

describe('<ContentRoot />', function () {
  it('Contains all components', function () {
    const wrapper = Enzyme.shallow(<ContentRoot />);

    expect(wrapper.find('Connect(NewGame)'), 'NewGame').to.have.lengthOf(1);
    expect(wrapper.find('Connect(TrapGrid)'), 'TrapGrid').to.have.lengthOf(1);
    expect(wrapper.find('Connect(InputMode)'), 'InputMode').to.have.lengthOf(1);
    expect(wrapper.find('Connect(RemainingTraps)'), 'RemainingTraps').to.have.lengthOf(1);
    expect(wrapper.find('Connect(Timer)'), 'Timer').to.have.lengthOf(1);
    expect(wrapper.find('Connect(Smiley)'), 'Smiley').to.have.lengthOf(1);
  });

  it('Contains a version indicator', function () {
    const styles = {
      versionIndicator: 'versionIndicator'
    };

    const ContentRootWithInjection = require('inject-loader!../../src/components/content-root.jsx')({
      '../../package.json': { version: '1.2.3' },
      '../../stylesheets/content-root.scss': styles
    }).default;

    const wrapper = Enzyme.shallow(<ContentRootWithInjection />);

    expect(wrapper.find(`.${styles.versionIndicator}`).text()).to.equal('Version 1.2.3');
  });
});
