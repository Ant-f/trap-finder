import { connect } from 'react-redux';
import Timer from '../components/timer.jsx';

export const mapStateToProps = state => {
  return {
    timerState: state.get('timerState')
  };
};

export default connect(mapStateToProps)(Timer);
