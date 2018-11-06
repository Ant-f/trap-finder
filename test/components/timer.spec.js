/* global describe, it, require */

import * as React from 'react';
import chai, { expect } from 'chai';
import Enzyme from '../root-hooks.spec.js';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Timer from '../../src/components/timer.jsx';
import * as timerStates from '../../src/components/timer-states';

chai.use(sinonChai);

const getTimer = (elapsedTimeIntervals) => {
  const times = [0];

  for (let i = 0; i < elapsedTimeIntervals.length; i++) {
    const newTime = times[i] + elapsedTimeIntervals[i];
    times.push(newTime);
  }

  const TimerWithInjection = require('inject-loader!../../src/components/timer.jsx')({
    '../helpers/time-provider': () => times.shift()
  }).default;

  const wrapper = Enzyme.shallow(<TimerWithInjection />);
  return wrapper.instance();
};

const wrapSetState = timer => {
  const setState = sinon.fake(timer.setState);
  sinon.replace(timer, 'setState', setState);
  return setState;
};

describe('<Timer />', function () {
  it('Displays elapsed time', function () {
    const wrapper = Enzyme.shallow(<Timer />);
    wrapper.setState({ elapsedTime: '00:01:43' });
    expect(wrapper.text()).to.equal('Time: 00:01:43');
  });
});

describe('Timer state', function () {
  describe('When started', function () {
    it('Updates time when 1st second has passed', function () {
      
      // Arrange

      const timer = getTimer([1000]);
      timer.start();
      const setState = wrapSetState(timer);
      
      // Act
      
      timer.update();
  
      // Assert
  
      expect(setState).to.have.been.calledOnce;
      expect(timer.state.elapsedTime).to.equal('00:00:01');
    });

    it('Updates time when 2nd second has passed', function () {
      
      // Arrange

      const timer = getTimer([1000, 1000]);
      timer.start();
      const setState = wrapSetState(timer);
      
      // Act
      
      timer.update();
      timer.update();
  
      // Assert
      
      sinon.assert.calledWith(setState.getCall(0), {
        elapsedTime: '00:00:01',
        lastUpdateTime: 1000
      });

      sinon.assert.calledWith(setState.getCall(1), {
        elapsedTime: '00:00:02',
        lastUpdateTime: 2000
      });
    });

    it('Minutes are displayed correctly', function () {
      
      // Arrange

      const timer = getTimer([60000]);
      timer.start();
      
      // Act
      
      timer.update();
  
      // Assert
  
      expect(timer.state.elapsedTime).to.equal('00:01:00');
    });

    it('Hours are displayed correctly', function () {
      
      // Arrange

      const timer = getTimer([3600000]);
      timer.start();
      
      // Act
      
      timer.update();
  
      // Assert
  
      expect(timer.state.elapsedTime).to.equal('01:00:00');
    });

    it('Does not update time before 1st second has passed', function () {
      
      // Arrange

      const timer = getTimer([500]);
      timer.start();
      const setState = wrapSetState(timer);
      
      // Act
      
      timer.update();
  
      // Assert
  
      expect(setState).not.to.have.been.called;
    });

    it('Does not update time when called again between 1st and 2nd second', function () {
      
      // Arrange

      const timer = getTimer([1000, 500]);
      timer.start();
      const setState = wrapSetState(timer);
      
      // Act
      
      timer.update();
      timer.update();
  
      // Assert
  
      expect(setState).to.have.been.calledOnceWith({
        elapsedTime: '00:00:01',
        lastUpdateTime: 1000
      });
    });

    it('Does not reset elapsed time when calling start() again', function () {
      
      // Arrange

      const timer = getTimer([1000, 1000]);
      timer.start();
      timer.update();
      
      // Act
      
      timer.start();
      timer.update();
  
      // Assert
  
      expect(timer.state.elapsedTime).to.equal('00:00:02');
    });

    it('Sets timer-state to be started', function () {
      
      // Arrange

      const timer = getTimer([]);
      
      // Act
      
      timer.start();
  
      // Assert
  
      expect(timer.state.timerState).to.equal(timerStates.STARTED);
    });
  });

  it('Does not update time before starting', function () {
      
    // Arrange

    const timer = getTimer([1000]);
    const setState = wrapSetState(timer);
      
    // Act
      
    timer.update();
  
    // Assert
  
    expect(setState).not.to.have.been.called;
  });

  it('Does not update time when stopped', function () {
      
    // Arrange

    const timer = getTimer([1000]);
    timer.start();
    timer.stop();
    const setState = wrapSetState(timer);
      
    // Act
      
    timer.update();
  
    // Assert
  
    expect(setState).not.to.have.been.called;
  });

  it('Sets timer-state to be stopped when stopped', function () {
      
    // Arrange

    const timer = getTimer([]);
    
    // Act
    
    timer.stop();

    // Assert

    expect(timer.state.timerState).to.equal(timerStates.STOPPED);
  });

  it('has 00:00:00 as elasped time on creation', function () {
      
    // Arrange, Act

    const timer = getTimer([]);
  
    // Assert
  
    expect(timer.state.elapsedTime).to.equal('00:00:00');
  });

  it('Resets timer state when reset', function () {
      
    // Arrange

    const timer = getTimer([1000]);
    timer.start();
    timer.update();

    const setState = sinon.fake(timer.setState);
    sinon.replace(timer, 'setState', setState);
    
    // Act
    
    timer.reset();

    // Assert

    expect(setState).to.have.been.calledOnce;
    expect(timer.state.elapsedTime).to.equal('00:00:00');
    expect(timer.state.timerState).to.equal(timerStates.RESET);
  });

  describe('componentDidUpdate', function () {
    it('Starts the timer', () => {

      // Arrange
      
      const timer = new Timer();
      const start = sinon.fake();
      sinon.replace(timer, 'start', start);
      
      timer.props = {
        timerState: timerStates.STARTED
      };

      // Act

      timer.componentDidUpdate();

      // Assert

      expect(start).to.have.been.calledOnce;
    });

    it('Stops the timer', () => {

      // Arrange
      
      const timer = new Timer();
      const stop = sinon.fake();
      sinon.replace(timer, 'stop', stop);
      
      timer.props = {
        timerState: timerStates.STOPPED
      };

      // Act

      timer.componentDidUpdate();

      // Assert

      expect(stop).to.have.been.calledOnce;
    });

    it('Resets the timer', () => {

      // Arrange
      
      const timer = new Timer();
      const reset = sinon.fake();
      sinon.replace(timer, 'reset', reset);
      
      timer.props = {
        timerState: timerStates.RESET
      };

      // Act

      timer.componentDidUpdate();

      // Assert

      expect(reset).to.have.been.calledOnce;
    });
  });
});
