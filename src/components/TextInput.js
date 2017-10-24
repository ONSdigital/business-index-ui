import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ id, label, onChange, autoFocus, value }) => {
  return (
    <div className="sdc-isolation field">
      <label className="label" htmlFor="text-input">{label}
      </label>
      <input value={value} autoFocus={autoFocus} className="input input--text" onChange={onChange} type="text" id={id} />
    </div>
  );
};

TextInput.defaultProps = {
  autoFocus: false,
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextInput;
