import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import { employmentBands, legalStatusBands, turnoverBands, tradingStatusBands } from '../utils/convertBands';
import '../resources/css/sdc-isolation.css';

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
};

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

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  bands: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};

class MatchForm extends React.Component {
  // For the id of each input, we use the same name as the business-index-api input
  render() {
    return (
      <form>
        <TextInput value={this.props.initialValues.BusinessName} label="Business Name" id="BusinessName" autoFocus onChange={this.props.onChange} /><br />
        <TextInput value={this.props.initialValues.VatRefs} label="VAT Number" id="VatRefs" onChange={this.props.onChange} /><br />
        <TextInput value={this.props.initialValues.PayeRefs} label="PAYE Number" id="PayeRefs" onChange={this.props.onChange} /><br />
        <TextInput value={this.props.initialValues.CompanyNo} label="Company Number" id="CompanyNo" onChange={this.props.onChange} /><br />
        <TextInput value={this.props.initialValues.IndustryCode} label="Industry Code" id="IndustryCode" onChange={this.props.onChange} /><br />
        <SelectInput value={this.props.initialValues.EmploymentBands} label="Employment Bands" id="EmploymentBands" onChange={this.props.onChange} bands={employmentBands} /><br />
        <SelectInput value={this.props.initialValues.LegalStatus} label="Legal Status" id="LegalStatus" onChange={this.props.onChange} bands={legalStatusBands} /><br />
        <SelectInput value={this.props.initialValues.Turnover} label="Turnover" id="Turnover" onChange={this.props.onChange} bands={turnoverBands} /><br />
        <SelectInput value={this.props.initialValues.TradingStatus} label="Trading Status" id="TradingStatus" onChange={this.props.onChange} bands={tradingStatusBands} /><br />
        <TextInput label="Post Code" id="PostCode" onChange={this.props.onChange} /><br />
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

MatchForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.bool.isRequired,
  showFilter: PropTypes.bool.isRequired,
  // valid: PropTypes.string.isRequired,
  // value: PropTypes.string.isRequired,
};

export default MatchForm;
