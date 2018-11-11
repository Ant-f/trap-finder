import * as React from 'react';
import * as styles from '../../stylesheets/timer';
import * as timerStates from './timer-states';
import getTime from '../helpers/time-provider';
import PropTypes from 'prop-types';

const format = number => ('00' + number).slice(-2);

const defaultState = {
  elapsedTime: '00:00:00',
  lastUpdateTime: undefined,
  startTime: undefined,
  timerState: timerStates.RESET
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.update(),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidUpdate() {
    if (this.props.timerState === timerStates.STARTED) {
      this.start();
    }
    else if (this.props.timerState === timerStates.STOPPED) {
      this.stop();
    }
    else if (this.props.timerState === timerStates.RESET) {
      this.reset();
    }
  }

  update() {
    const now = getTime();
    
    // Update only need for each second
    const updateNeeded = now - this.state.lastUpdateTime >= 1000;
    
    if (updateNeeded) {
      const milliseconds = now - this.state.startTime;
      const seconds = Math.floor(milliseconds / 1000) % 60;
      const minutes = Math.floor(milliseconds / 60000) % 60;
      const hours = Math.floor(milliseconds / 3600000) % 60;

      this.setState({
        elapsedTime: `${format(hours)}:${format(minutes)}:${format(seconds)}`,
        lastUpdateTime: now
      });
    }
  }

  start() {
    this.setState(state => {
      if (state.timerState !== timerStates.STARTED) {
        const now = getTime();

        return {
          lastUpdateTime: now,
          startTime: now,
          timerState: timerStates.STARTED
        };
      }
    });
  }

  stop() {
    this.setState(state => {
      if (state.timerState !== timerStates.STOPPED) {
        return {
          lastUpdateTime: undefined,
          timerState: timerStates.STOPPED
        };
      }
    });
  }

  reset() {
    this.setState(state => {
      if (state.timerState !== timerStates.RESET) {
        return defaultState;
      }
    });
  }

  render() {
    return (
      <div className={styles.timer} title="Elapsed time">
        {this.state.elapsedTime}
      </div>
    );
  }
}

Timer.propTypes = {
  timerState: PropTypes.string
};

export default Timer;
