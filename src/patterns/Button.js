import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'halogen/PulseLoader';

/**
 * @const Button - An ONS style Button with a loading spinner. The button
 * will only call the passed in onClick function if it is not in a
 * loading state.
 */
const Button = ({ id, size, ariaLabel, loading, onClick, text, type, btnClass, btnBorder, style }) => {
  const spinner = (<Loader id="spinner" color="#FFFFFF" size="8px" margin="0px" />);
  return (
    <button
      className={`btn btn--${btnClass} ${btnBorder} venus btn--${size}`}
      id={id}
      aria-label={ariaLabel}
      onClick={loading ? null : onClick}
      style={style}
      type={type}
    >
      {loading ? spinner : text}
    </button>
  );
};

Button.defaultProps = {
  loading: false,
  onClick: null,
  btnClass: 'primary',
  btnBorder: '',
  style: {},
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
  loading: PropTypes.bool,
  btnBorder: PropTypes.string,
  style: PropTypes.object,
};

export default Button;
