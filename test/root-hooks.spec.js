/* global afterEach, before */

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

before(function () {
  Enzyme.configure({ adapter: new Adapter() });
});

afterEach(() => {
  sinon.restore();
});

export default Enzyme;
