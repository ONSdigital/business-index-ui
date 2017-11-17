import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxInput = ({ id, label, onChangeFilter, value }) => {
  return (
    <div className="sdc-isolation field field--checkbox field--multiplechoice">
      <div style={{ backgroundColor: '#EAEAEA' }} className="field__item js-focusable-box">
        <input checked={value} onChange={onChangeFilter} value={value} className="input input--checkbox js-focusable" type="checkbox" id={id} />
        <label className="label label--inline venus" htmlFor="checkbox">{label}</label>
      </div>
    </div>
  );
};

CheckBoxInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export default CheckBoxInput;
