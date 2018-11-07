import * as React from 'react';
import * as styles from '../../stylesheets/content-root.scss';
import NewGame from '../containers/new-game-container';
import RemainingTraps from '../containers/remaining-traps-container';
import Smiley from '../containers/smiley-container';
import Timer from '../containers/timer-container';
import TrapGrid from '../containers/trap-grid-container';

const ContentRoot = () => (
  <div>
    <div className={styles.newGame}>
      <NewGame />
    </div>
    
    <div className={styles.pageBody}>
      <h1>Trap Finder</h1>
      <a href="https://github.com/Ant-f/trap-finder">Copyright © 2018 Anthony Fung</a>
      <TrapGrid />
    </div>

    <div className={styles.footer}>
      <RemainingTraps />
      <div className={styles.timerTray}>
        <Timer />
        <Smiley />
      </div>
    </div>
  </div>);

export default ContentRoot;
