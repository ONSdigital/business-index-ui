import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({ id, label, bands, onChange, value }) => {
  if (value === undefined) {
    value = '';
  }
  return (
    <div className="sdc-isolation field field--select">
      <label className="label" htmlFor="select">{label}
      </label>
      <select id={id} value={value} className="input input--select" name="select" onInput={onChange} style={{ padding: '0.3rem', fontSize: '1rem' }}>
        <option value="">Select an option</option>
        { Object.keys(bands).map(band => (<option key={band} value={band}>{band} [{bands[band]}]</option>))}
      </select>
    </div>
  );
};

SelectInput.defaultProps = {
  value: '',
};

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  bands: PropTypes.object.isRequired,
  value: PropTypes.string,
};

export default SelectInput;
