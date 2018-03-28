import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../patterns/TextInput';
import TextInputRange from '../patterns/TextInputRange';
import Button from '../patterns/Button';
import SelectMultipleInput from '../patterns/SelectMultipleInput';
import { employmentBands, legalStatusBands, turnoverBands, tradingStatusBands } from '../utils/convertBands';

/**
 * @const ResultsSearchForm - The form to be shown on the Results page
 *
 * https://stackoverflow.com/questions/41048546/how-can-i-attach-to-a-stateless-components-ref-in-react
 */
class ResultsSearchForm extends React.Component {
  render = () => (
    <form>
      <div className="wrapper">
        <div className="group">
          <div className="col-6">
            <TextInput id="BusinessName" onChange={this.props.onChange} autoFocus={true} type="bi-search-input-wide" label="Business name" value={this.props.initialValues.BusinessName} ref={ip => (this.childTextInput = ip)} />
          </div>
          <div className="col-2">
            <TextInput id="PostCode" size={this.props.size} onChange={this.props.onChange} type="bi-search-input-wide" label="Postcode" value={this.props.initialValues.PostCode} />
          </div>
          <div className="col-4">
            <TextInputRange id="IndustryCode" checkBoxSize="sml" labelClass="label input-margin-sic" size={this.props.size} onChange={this.props.onChange} label="Industry classification (SIC)" toggleText="Search range" value={this.props.initialValues.IndustryCode} />
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="group">
          <div className="col-3">
            <TextInput labelClass="label input-margin-sml" id="Id" size={this.props.size} onChange={this.props.onChange} type="search" label="UBRN" value={this.props.initialValues.Id} />
          </div>
          <div className="col-3">
            <TextInput labelClass="label input-margin-sml" id="CompanyNo" size={this.props.size} onChange={this.props.onChange} type="search" label="CRN" value={this.props.initialValues.CompanyNo} />
          </div>
          <div className="col-3">
            <TextInput labelClass="label input-margin-sml" id="VatRefs" size={this.props.size} onChange={this.props.onChange} type="search" label="VAT" value={this.props.initialValues.VatRefs} />
          </div>
          <div className="col-3">
            <TextInput labelClass="label input-margin-sml" id="PayeRefs" size={this.props.size} onChange={this.props.onChange} type="search" label="PAYE" value={this.props.initialValues.PayeRefs} />
          </div>
        </div>
      </div>
      <div className="wrapper">
			  <div className="group">
				  <div className="col-6">
            <SelectMultipleInput id="EmploymentBands" size={this.props.size} value={this.props.initialValues.EmploymentBands} onChange={this.props.onChange} label="Employment Bands" bands={employmentBands} />
          </div>
          <div className="col-6">
            <SelectMultipleInput id="Turnover" size={this.props.size} value={this.props.initialValues.Turnover} onChange={this.props.onChange} label="Turnover Bands" bands={turnoverBands} />
          </div>
          <div className="col-6">
            <SelectMultipleInput id="TradingStatus" size={this.props.size} value={this.props.initialValues.TradingStatus} onChange={this.props.onChange} label="Trading Status Bands" bands={tradingStatusBands} />
          </div>
          <div className="col-6">
            <SelectMultipleInput id="LegalStatus" size={this.props.size} value={this.props.initialValues.LegalStatus} onChange={this.props.onChange} label="Legal Status Bands" bands={legalStatusBands} />
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="group">
          <div className="col-12">
            <Button className="btn btn--primary venus btn--wide" id="searchButton" type="submit" text="Search" onClick={this.props.onSubmit} ariaLabel="Search Button" loading={this.props.currentlySending} />
            <Button className="btn btn--secondary btn--border" id="clearButton" text="Clear" onClick={this.props.onClear} ariaLabel="Clear Button" type="reset" />
          </div>
        </div>
      </div>
    </form>
  );
}

ResultsSearchForm.defaultProps = {
  className: '',
  size: 's',
  autoFocus: false,
};

ResultsSearchForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  size: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default ResultsSearchForm;
