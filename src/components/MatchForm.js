import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import { employmentBands, legalStatusBands, turnoverBands, tradingStatusBands } from '../utils/convertBands';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import CheckBoxInput from './CheckBoxInput';

class MatchForm extends React.Component {
  // For the id of each input, we use the same name as the business-index-api input
  render() {
    return (
      <form>
        <div className="sdc-isolation field">
          <div className="grid grid--tight">
            <div className="grid__col col-6@m">
              <TextInput ref={ip => (this.childTextInput = ip)} value={this.props.initialValues.BusinessName} label="Business Name" id="BusinessName" autoFocus onChange={this.props.onChange} /><br />
            </div>
          </div>
          <div className="grid grid--tight">
            <div className="grid__col col-4@m">
              <TextInput value={this.props.initialValues.VatRefs} label="VAT Number" id="VatRefs" onChange={this.props.onChange} /><br />
            </div>
            <div className="grid__col col-4@m">
              <TextInput value={this.props.initialValues.PayeRefs} label="PAYE Number" id="PayeRefs" onChange={this.props.onChange} /><br />
            </div>
            <div className="grid__col col-4@m">
              <TextInput value={this.props.initialValues.CompanyNo} label="Company Number" id="CompanyNo" onChange={this.props.onChange} /><br />
            </div>
          </div>
          <div className="grid grid--tight">
            <div className="grid__col col-6@m">
              <TextInput value={this.props.initialValues.IndustryCode} label="Industry Code" id="IndustryCode" onChange={this.props.onChange} /><br />
            </div>
            <div className="grid__col col-6@m">
              <TextInput value={this.props.initialValues.PostCode} label="Post Code" id="PostCode" onChange={this.props.onChange} /><br />
            </div>
          </div>
          <div className="grid grid--tight">
            <div className="grid__col col-3@m">
              <SelectInput value={this.props.initialValues.EmploymentBands} label="Employment Bands" id="EmploymentBands" onChange={this.props.onChange} bands={employmentBands} /><br />
            </div>
            <div className="grid__col col-3@m">
              <SelectInput value={this.props.initialValues.LegalStatus} label="Legal Status" id="LegalStatus" onChange={this.props.onChange} bands={legalStatusBands} /><br />
            </div>
            <div className="grid__col col-3@m">
              <SelectInput value={this.props.initialValues.Turnover} label="Turnover" id="Turnover" onChange={this.props.onChange} bands={turnoverBands} /><br />
            </div>
            <div className="grid__col col-3@m">
              <SelectInput value={this.props.initialValues.TradingStatus} label="Trading Status" id="TradingStatus" onChange={this.props.onChange} bands={tradingStatusBands} /><br />
            </div>
          </div>
        </div>
        <Button id="loginButton" size="wide" text="Search" onClick={!this.props.currentlySending ? this.props.onSubmit : null} ariaLabel="Login Button" type="submit" loading={this.props.currentlySending} />
        &nbsp;
        <Button id="clearButton" size="wide" text="Clear" onClick={this.props.onClear} ariaLabel="Clear Button" type="reset" />
        <br /><br />
        {this.props.showFilters &&
          <div className="sdc-isolation field">
            <div className="grid grid--tight" style={{ margin: '0', padding: '0' }}>
              <div className="grid__col col-3@m" style={{ margin: '0', padding: '0' }}>
                <CheckBoxInput value={this.props.filter} label="Filter Results" id="FilterCheckbox" onChangeFilter={this.props.onChangeFilter} />
              </div>
              <div className="grid__col col-3@m">
                <CheckBoxInput value={this.props.convertBands} label="Convert Bands" id="ConvertBandsCheckbox" onChangeFilter={this.props.onChangeBands} />
              </div>
            </div>
          </div>
        }
      </form>
    );
  }
}

MatchForm.defaultProps = {
  convertBands: true,
};

MatchForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onChangeBands: PropTypes.func.isRequired,
  filter: PropTypes.bool.isRequired,
  showFilters: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  convertBands: PropTypes.bool,
};

export default MatchForm;
