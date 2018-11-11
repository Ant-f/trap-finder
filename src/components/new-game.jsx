import * as React from 'react';
import * as styles from '../../stylesheets/new-game';
import PropTypes from 'prop-types';

class NewGame extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: props.defaultHeight,
      width: props.defaultWidth,
      trapCount: props.defaultTrapCount
    };
  }
  
  render() {
    return (
      <div className={styles.componentRoot}>
        <label>
          <span className={styles.labelText}>
            Width
          </span>
          
          <input
            className={styles.numberInput}
            onChange={e => { this.setState({ width: e.target.value }); }}
            type="input"
            value={this.state.width} />
        </label>

        <label>
          <span className={styles.labelText}>
            Height
          </span>

          <input
            className={styles.numberInput}
            onChange={e => { this.setState({ height: e.target.value }); }}
            type="input"
            value={this.state.height} />
        </label>

        <label>
          <span className={styles.labelText}>
            Traps
          </span>
          
          <input
            className={styles.numberInput}
            onChange={e => { this.setState({ trapCount: e.target.value }); }}
            type="input"
            value={this.state.trapCount} />
        </label>

        <button onClick={() => {
          this.props.startNewGame(
            this.state.width,
            this.state.height,
            this.state.trapCount);
        }}>
          New Game
        </button>
      </div>
    );
  }
}

NewGame.propTypes = {
  defaultHeight: PropTypes.number.isRequired,
  defaultTrapCount: PropTypes.number.isRequired,
  defaultWidth: PropTypes.number.isRequired,
  startNewGame: PropTypes.func.isRequired
};

export default NewGame;
