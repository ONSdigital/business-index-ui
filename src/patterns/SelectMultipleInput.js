import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import { formSelectJson } from '../utils/helperMethods';

/**
 * @class SelectMultipleInput - This provides a select input where multiple
 * options can be selected, using react-select.
 */
class SelectMultipleInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.formValues(this.props.value),
      inputsJson: formSelectJson(this.props.bands),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.value !== nextProps.value) {
      this.setState({ ...this.state, values: this.formValues(nextProps.value) });
    }
  }
  componentDidUpdate = () => {
    // This is to fix a bug with react-select where the little cross symbol does
    // not appear due to an aria-hidden attribute.
    // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
    const elements = Array.from(document.getElementsByClassName('Select-value-icon'));
    if (elements.length > 0) {
      elements.map(e => ((e !== undefined) ? e.setAttribute('aria-hidden', 'false') : null));
    }
  }
  formValues = (value) => ((value === undefined || value.length === 0) ? [] : value.join(','));
  handleSelectChange = (values) => {
    this.setState({ ...this.state, values });
    // Make our lives easier by mimicking the exact json of an input event
    this.props.onChange({
      target: {
        id: this.props.id,
        value: (values === '') ? [] : values.split(','),
      },
    });
  }
  render = () => (
    <div id={this.props.id} className={`field field--select u-mb-${this.props.size}`}>
      <label className={this.props.labelClass} htmlFor="select">{this.props.label}</label>
      <Select
        style={{ width: '100%', height: '46px' }}
        closeOnSelect={false}
        disabled={false}
        multi
        onChange={this.handleSelectChange}
        options={this.state.inputsJson}
        placeholder=""
        simpleValue
        value={this.state.values}
      />
    </div>
  );
}

SelectMultipleInput.defaultProps = {
  value: [],
  labelClass: 'label',
};

SelectMultipleInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  bands: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  labelClass: PropTypes.string,
  value: PropTypes.array,
};

export default SelectMultipleInput;
