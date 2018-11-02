import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducer from './reducer';
import Timer from './containers/timer-container';
import TrapGrid from './containers/trap-grid-container';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Timer />
      <TrapGrid />
    </div>
  </Provider>,
  document.getElementById('app-content'),
);
