import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../patterns/TextInput';
import TextInputRange from '../patterns/TextInputRange';
import Button from '../patterns/Button';
import SelectMultipleInput from '../patterns/SelectMultipleInput';
import { employmentBands, legalStatusBands, turnoverBands, tradingStatusBands } from '../utils/convertBands';

/**
 * @const ResultsSearchForm - The form to be shown on the Results page
 */
const ResultsSearchForm = (props) => (
  <form style={{ marginTop: '10px' }}>
    <div className="wrapper">
      <div className="group">
        <div className="col-6">
          <TextInput id="BusinessName" onChange={props.onChange} autoFocus type="bi-search-input-wide" label="Business name" value={props.initialValues.BusinessName} />
        </div>
        <div className="col-2">
          <TextInput id="PostCode" size="xs" onChange={props.onChange} type="bi-search-input-wide" label="Postcode" value={props.initialValues.PostCode} />
        </div>
        <div className="col-4">
          <TextInputRange inputClass="bi-postcode-input-edit" minInputClass="bi-sic-input-edit-landscape" style={{ marginTop: '-25px' }} id="IndustryCode" checkBoxSize="sml" labelClass="label input-margin-sic" size="xs" onChange={props.onChange} label="Industry classification (SIC)" toggleText="Search range" value={props.initialValues.IndustryCode} />
        </div>
      </div>
    </div>
    <div className="wrapper">
      <div className="group">
        <div className="col-3">
          <TextInput labelClass="label input-margin-sml" id="Id" size="xs" onChange={props.onChange} type="search" label="UBRN" value={props.initialValues.Id} />
        </div>
        <div className="col-3">
          <TextInput labelClass="label input-margin-sml" id="CompanyNo" size="xs" onChange={props.onChange} type="search" label="CRN" value={props.initialValues.CompanyNo} />
        </div>
        <div className="col-3">
          <TextInput labelClass="label input-margin-sml" id="VatRefs" size="xs" onChange={props.onChange} type="search" label="VAT" value={props.initialValues.VatRefs} />
        </div>
        <div className="col-3">
          <TextInput labelClass="label input-margin-sml" id="PayeRefs" size="xs" onChange={props.onChange} type="search" label="PAYE" value={props.initialValues.PayeRefs} />
        </div>
      </div>
    </div>
    <div className="wrapper">
      <div className="group">
        <div className="col-6">
          <SelectMultipleInput id="EmploymentBands" size="xs" value={props.initialValues.EmploymentBands} onChange={props.onChange} label="Employment Bands" bands={employmentBands} />
        </div>
        <div className="col-6">
          <SelectMultipleInput id="Turnover" size="xs" value={props.initialValues.Turnover} onChange={props.onChange} label="Turnover Bands" bands={turnoverBands} />
        </div>
        <div className="col-6">
          <SelectMultipleInput id="TradingStatus" size="xs" value={props.initialValues.TradingStatus} onChange={props.onChange} label="Trading Status Bands" bands={tradingStatusBands} />
        </div>
        <div className="col-6">
          <SelectMultipleInput id="LegalStatus" size="xs" value={props.initialValues.LegalStatus} onChange={props.onChange} label="Legal Status Bands" bands={legalStatusBands} />
        </div>
      </div>
    </div>
    <div className="wrapper">
      <div className="group">
        <div className="col-12">
          <Button className="btn btn--primary venus btn--wide" id="searchButton" type="submit" text="Search" onClick={props.onSubmit} ariaLabel="Search Button" loading={props.currentlySending} />
          <Button className="btn btn--secondary btn--border" id="clearButton" text="Clear" onClick={props.onClear} ariaLabel="Clear Button" type="reset" />
        </div>
      </div>
    </div>
  </form>
);

ResultsSearchForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default ResultsSearchForm;
