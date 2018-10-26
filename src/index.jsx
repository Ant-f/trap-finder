import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducer from './reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <div>
      Page Content
    </div>
  </Provider>,
  document.getElementById('app-content'),
);
