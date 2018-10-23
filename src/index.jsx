import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const reducer = (state = {}) => {
  return state;
};

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <div>
      Page Content
    </div>
  </Provider>,
  document.getElementById('app-content'),
);
