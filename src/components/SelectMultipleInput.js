import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';

class SelectMultipleInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.formValues(this.props.value),
      inputsJson: this.formProperJson(this.props.bands),
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    // Look at index.css for .Select-menu-outer for a 'position' fix
    // to push down items below when the options menu is open
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ values: this.formValues(nextProps.value) });
    }
  }
  componentDidUpdate() {
    // This is to fix a bug with react-select where the little cross symbol does
    // not appear due to an aria-hidden attribute.
    const elements = document.getElementsByClassName('Select-value-icon');
    for (let i = 0; i <= elements.length; i += 1) {
      if (document.getElementsByClassName('Select-value-icon')[i] !== undefined) {
        document.getElementsByClassName('Select-value-icon')[i].setAttribute('aria-hidden', 'false');
      }
    }
  }
  formValues(value) {
    if (value === undefined) {
      return [];
    }
    return value.join(',');
  }
  formProperJson(json) {
    const arr = Object.keys(json).map((key) => {
      return { label: `${key} [${json[key]}]`, value: key };
    });
    return arr;
  }
  handleSelectChange(values) {
    this.setState({ values });
    // Make our lives easier by mimicking the exact json of an input event
    const evt = {
      target: {
        id: this.props.id,
        value: values.split(','),
      },
    };
    this.props.onChange(evt);
  }
  render() {
    return (
      <div id={this.props.id}>
        <div className="sdc-isolation">
          <label className="label" htmlFor="select">{this.props.label}</label>
        </div>
        <Select
          style={{ width: '400px' }}
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
}

SelectMultipleInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  bands: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
};

export default SelectMultipleInput;
