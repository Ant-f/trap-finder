import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NewGame from './containers/new-game-container';
import reducer from './reducer';
import RemainingTraps from './containers/remaining-traps-container';
import Smiley from './containers/smiley-container';
import Timer from './containers/timer-container';
import TrapGrid from './containers/trap-grid-container';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <NewGame />
      <Smiley />
      <Timer />
      <TrapGrid />
      <RemainingTraps />
    </div>
  </Provider>,
  document.getElementById('app-content'),
);
