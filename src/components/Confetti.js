import React from 'react';
import PropTypes from 'prop-types';
import Confetti from 'react-confetti';
import { connect } from 'react-redux';

/**
 * @class ShowConfetti - On login, if the showConfetti boolean is set to true
 * in the login response from the Node server, confetti will be shown for
 * a length of time, over which the confetti will gradually fade out.
 */
class ShowConfetti extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      count: 0,
    };
    if (this.props.showConfetti) {
      this.interval = setInterval(this.tick, 250);
    }
  }
  componentWillUnmount = () => clearInterval(this.interval);
  tick = () => {
    if (this.state.count > (this.props.seconds / 0.25)) {
      clearInterval(this.interval);
    }
    this.setState({
      ...this.state,
      count: this.state.count + 1,
      opacity: this.state.opacity - (0.25 / this.props.seconds)
    });
  }
  render = () => (
    <div>
      {(this.state.count < (this.props.seconds / 0.25) && this.props.showConfetti) &&
        <Confetti opacity={this.state.opacity} width={window.innerWidth - 100} height={window.innerHeight} />
      }
    </div>
  );
}

ShowConfetti.propTypes = {
  showConfetti: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
};

const select = (state) => ({
  showConfetti: state.login.showConfetti,
});

export default connect(select)(ShowConfetti);
