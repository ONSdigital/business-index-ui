import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import { employmentBands, legalStatusBands, turnoverBands, tradingStatusBands } from '../utils/convertBands';
import '../resources/css/sdc-isolation.css';

const TextInput = ({ id, label, onChange, autoFocus }) => {
  return (
    <div className="sdc-isolation field">
      <label className="label" htmlFor="text-input">{label}
      </label>
      <input autoFocus={autoFocus} className="input input--text" onChange={onChange} type="text" id={id} />
    </div>
  );
};

TextInput.defaultProps = {
  autoFocus: false,
};

const SelectInput = ({ id, label, bands, onChange }) => {
  return (
    <div className="sdc-isolation field field--select">
      <label className="label" htmlFor="select">{label}
      </label>
      <select id={id} className="input input--select" name="select" onInput={onChange} style={{ padding: '0.3rem', fontSize: '1rem' }}>
        <option selected disabled>Select an option</option>
        { Object.keys(bands).map(band => (<option value={band}>{band} [{bands[band]}]</option>))}
      </select>
    </div>
  );
};

class MatchForm extends React.Component {
  render() {
    return (
      <form>
        <TextInput label="Business Name" id="businessName" autoFocus onChange={this.props.onChange} /><br />
        <TextInput label="VAT Number" id="vatNumber" onChange={this.props.onChange} /><br />
        <TextInput label="PAYE Number" id="payeNumber" onChange={this.props.onChange} /><br />
        <TextInput label="Company Number" id="companyNumber" onChange={this.props.onChange} /><br />
        <TextInput label="Industry Code" id="industryCode" onChange={this.props.onChange} /><br />
        <SelectInput label="Employment Bands" id="employmentBands" onChange={this.props.onChange} bands={employmentBands} /><br />
        <SelectInput label="Legal Status" id="legalStatus" onChange={this.props.onChange} bands={legalStatusBands} /><br />
        <SelectInput label="Turnover" id="turnover" onChange={this.props.onChange} bands={turnoverBands} /><br />
        <SelectInput label="Trading Status" id="tradingStatus" onChange={this.props.onChange} bands={tradingStatusBands} /><br />
        <TextInput label="Post Code" id="postCode" onChange={this.props.onChange} /><br />
        <Button id="loginButton" size="wide" text="Search" onClick={!this.props.currentlySending ? this.props.onSubmit : null} ariaLabel="Login Button" type="submit" loading={this.props.currentlySending} />
      </form>
    );
  }
}

MatchForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  valid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default MatchForm;
