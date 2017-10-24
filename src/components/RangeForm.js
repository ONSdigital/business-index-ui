import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import { employmentBands, legalStatusBands, turnoverBands, tradingStatusBands } from '../utils/convertBands';
import TextInput from './TextInput';
import SelectInput from './SelectInput';

class RangeForm extends React.Component {
  // For the id of each input, we use the same name as the business-index-api input
  render() {
    return (
      <form>
        <TextInput value={this.props.initialValues.IndustryCode} label="Industry Code" id="IndustryCode" onChange={this.props.onChange} /><br />
        <TextInput value={this.props.initialValues.PostCode} label="Post Code" id="PostCode" onChange={this.props.onChange} /><br />
        <SelectInput value={this.props.initialValues.EmploymentBands} label="Employment Bands" id="EmploymentBands" onChange={this.props.onChange} bands={employmentBands} /><br />
        <Button id="loginButton" size="wide" text="Search" onClick={!this.props.currentlySending ? this.props.onSubmit : null} ariaLabel="Login Button" type="submit" loading={this.props.currentlySending} />
        &nbsp;
        <Button id="clearButton" size="wide" text="Clear" onClick={this.props.onClear} ariaLabel="Clear Button" type="reset" />
        <br /><br />
        {this.props.showFilter &&
          <div className="sdc-isolation field field--checkbox field--multiplechoice">
            <div className="field__item js-focusable-box">
              <input onChange={this.props.onChangeFilter} value={this.props.filter} className="input input--checkbox js-focusable" type="checkbox" id="checkbox" />
              <label className="label label--inline venus" htmlFor="checkbox">Filter Results</label>
            </div>
          </div>
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
