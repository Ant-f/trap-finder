/* global before */

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

before(function () {
  Enzyme.configure({ adapter: new Adapter() });
});

export default Enzyme;
