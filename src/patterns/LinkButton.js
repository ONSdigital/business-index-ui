import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'halogen/PulseLoader';

/**
 * @const LinkButton - A link that acts as a button and a spinner for loading states
 *
 * When the link is in a loading state, the onClick method will not be called. The
 * display: 'inline-block' style is added to the link to prevent it overflowing
 * onto a new line when the spinner is showing.
 *
 * @param {String} id
 * @param {String} className
 * @param {String} text
 * @param {Function} onClick - The function to run on a mouse click
 * @param {Boolean} loading - If true, the spinner will show
 *
 * @return {Object} - The LinkButton component
 */
const LinkButton = ({ id, className, text, onClick, loading }) => {
  const spinner = (<Loader id="spinner" color="#FFFFFF" size="8px" margin="0px" />);
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
