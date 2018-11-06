import * as React from 'react';
import NewGame from '../containers/new-game-container';
import RemainingTraps from '../containers/remaining-traps-container';
import Smiley from '../containers/smiley-container';
import Timer from '../containers/timer-container';
import TrapGrid from '../containers/trap-grid-container';

const ContentRoot = () => (
  <div>
    <div>
      <NewGame />
    </div>
    
    <div>
      <TrapGrid />
    </div>

    <div>
      <RemainingTraps />
      <Timer />
      <Smiley />
    </div>
  </div>);

export default ContentRoot;
