import React from 'react';
import PropTypes from 'prop-types';
import Confetti from 'react-confetti';
import { connect } from 'react-redux';

class ShowConfetti extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      count: 0,
    };
    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    if (this.props.showConfetti) {
      this.interval = setInterval(this.tick, 250);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    if (this.state.count > (this.props.seconds / 0.25)) {
      clearInterval(this.interval);
    }
    this.setState({ count: this.state.count + 1, opacity: this.state.opacity - (0.25 / this.props.seconds) });
  }
  render() {
    return (
      <div>
        {(this.state.count < (this.props.seconds / 0.25) && this.props.showConfetti) &&
          <Confetti opacity={this.state.opacity} width={`${window.innerWidth}px`} height={`${window.innerHeight}px`} />
        }
      </div>
    );
  }
}

ShowConfetti.propTypes = {
  showConfetti: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
};

function select(state) {
  return {
    showConfetti: state.login.showConfetti,
  };
}

export default connect(select)(ShowConfetti);
