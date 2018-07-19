import React from 'react';
import PropTypes from 'prop-types';
import { PulseLoader } from 'halogenium';


/**
 * @const LinkButton - A link that acts as a button and a spinner for loading states
 *
 * When the link is in a loading state, the onClick method will not be called. The
 * display: 'inline-block' style is added to the link to prevent it overflowing
 * onto a new line when the spinner is showing.
 */
const LinkButton = ({ id, className, text, onClick, loading }) => {
  const spinner = (<PulseLoader id="spinner" color="#FFFFFF" size="8px" margin="0px" />);
  return (
    <a
      id={id}
      className={className}
      style={{ cursor: 'pointer', display: 'inline-block' }}
      onClick={loading ? null : onClick}
    >
      {loading ? spinner : text}
    </a>
  );
};

LinkButton.defaultProps = {
  loading: false,
  onClick: null,
  className: '',
};

LinkButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default LinkButton;
