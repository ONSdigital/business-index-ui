import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import { employmentBands, legalStatusBands, turnoverBands, tradingStatusBands } from '../utils/convertBands';
import TextInput from './TextInput';
import CheckBoxInput from './CheckBoxInput';
import SelectMultipleInput from './SelectMultipleInput';

class RangeForm extends React.Component {
  // For the id of each input, we use the same name as the business-index-api input
  render() {
    return (
      <form>
        <TextInput autoFocus ref={ip => (this.childTextInput = ip)} value={this.props.initialValues.IndustryCode} label="Industry Code" id="IndustryCode" onChange={this.props.onChange} /><br />
        <TextInput value={this.props.initialValues.PostCode} label="Post Code" id="PostCode" onChange={this.props.onChange} /><br />
        <SelectMultipleInput value={this.props.initialValues.EmploymentBands} id="EmploymentBands" onChange={this.props.onChange} label="Employment Bands" bands={employmentBands} /><br />
        <SelectMultipleInput value={this.props.initialValues.LegalStatus} id="LegalStatus" onChange={this.props.onChange} label="Legal Status Bands" bands={legalStatusBands} /><br />
        <SelectMultipleInput value={this.props.initialValues.Turnover} id="Turnover" onChange={this.props.onChange} label="Turnover Bands" bands={turnoverBands} /><br />
        <SelectMultipleInput value={this.props.initialValues.TradingStatus} id="TradingStatus" onChange={this.props.onChange} label="Trading Status Bands" bands={tradingStatusBands} /><br />
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
