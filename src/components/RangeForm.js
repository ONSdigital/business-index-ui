import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import { employmentBands, legalStatusBands, turnoverBands, tradingStatusBands } from '../utils/convertBands';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import CheckBoxInput from './CheckBoxInput';
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
    // Look at index.css for .Select-menu-outer
  }
  componentDidUpdate() {
    const elements = document.getElementsByClassName('Select-value-icon');
    for (let i = 0; i <= elements.length; i += 1) {
      if (document.getElementsByClassName('Select-value-icon')[i] !== undefined) {
        document.getElementsByClassName('Select-value-icon')[i].setAttribute('aria-hidden', 'false');
      }
    }
  }
  formValues(value) {
    console.log('value: ', value);
    if (value === undefined) {
      return [];
    }
    return value.split(',');
  }
  formProperJson(json) {
    const arr = Object.keys(json).map((key) => {
      return { label: `${key} [${json[key]}]`, value: key };
    });
    return arr;
  }
  handleSelectChange(value) {
    this.setState({ value });
    // Make our lives easier by mimicking the exact json of an input event
    const evt = {
      target: {
        id: this.props.id,
        value: value.split(','),
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
          value={this.state.value}
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
};

class RangeForm extends React.Component {
  // For the id of each input, we use the same name as the business-index-api input
  render() {
    return (
      <form>
        <TextInput value={this.props.initialValues.IndustryCode} label="Industry Code" id="IndustryCode" onChange={this.props.onChange} /><br />
        <TextInput value={this.props.initialValues.PostCode} label="Post Code" id="PostCode" onChange={this.props.onChange} /><br />
        <SelectMultipleInput value={this.props.initialValues.EmploymentBands} id="EmploymentBands" onChange={this.props.onChange} label="Employment Bands" bands={employmentBands} /><br />
        <SelectMultipleInput id="LegalStatus" onChange={this.props.onChange} label="Legal Status Bands" bands={legalStatusBands} /><br />
        <SelectMultipleInput id="Turnover" onChange={this.props.onChange} label="Turnover Bands" bands={turnoverBands} /><br />
        <SelectMultipleInput id="TradingStatus" onChange={this.props.onChange} label="Trading Status Bands" bands={tradingStatusBands} /><br />
        <br />
        <Button id="loginButton" size="wide" text="Search" onClick={!this.props.currentlySending ? this.props.onSubmit : null} ariaLabel="Login Button" type="submit" loading={this.props.currentlySending} />
        &nbsp;
        <Button id="clearButton" size="wide" text="Clear" onClick={this.props.onClear} ariaLabel="Clear Button" type="reset" />
        <br /><br />
        {this.props.showFilter &&
          <CheckBoxInput value={this.props.initialValues.IndustryCode} label="Filter Results" id="FilterCheckbox" onChangeFilter={this.props.onChange} />
        }
      </form>
    );
  }
}

RangeForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  filter: PropTypes.bool.isRequired,
  showFilter: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default RangeForm;
