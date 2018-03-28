import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../patterns/TextInput';
import TextInputRange from '../patterns/TextInputRange';
import Button from '../patterns/Button';
import SelectMultipleInput from '../patterns/SelectMultipleInput';
import { employmentBands, legalStatusBands, turnoverBands, tradingStatusBands } from '../utils/convertBands';

/**
 * @const HomeSearchForm - The form for the main search on the home page.
 */
const HomeSearchForm = (props) => (
  <form className="form">
    <TextInput labelClass="label neptune" id="BusinessName" size="u-mb-s" onChange={props.onChange} autoFocus type="bi-search-input" label="Business name" value={props.initialValues.BusinessName} />
    <TextInput labelClass="label__description" legend="Reference number" id="Id" size="u-mb-s" onChange={props.onChange} type="bi-search-input" label="Unique Business Reference Number (UBRN)" value={props.initialValues.Id} />
    <TextInput labelClass="label__description" id="CompanyNo" size="u-mb-s" onChange={props.onChange} type="bi-search-input" label="Company Number (CN)" value={props.initialValues.CompanyNo} />
    <TextInput labelClass="label__description" id="VatRefs" size="u-mb-s" onChange={props.onChange} type="bi-search-input" label="Value-Added Tax (VAT)" value={props.initialValues.VatRefs} />
    <TextInput labelClass="label__description" id="PayeRefs" size="u-mb-s" onChange={props.onChange} type="bi-search-input" label="Pay As You Earn (PAYE)" value={props.initialValues.PayeRefs} />
    <TextInput labelClass="label neptune" id="PostCode" size="u-mb-s" onChange={props.onChange} type="bi-postcode-input" label="Postcode" value={props.initialValues.PostCode} /><br />
    <TextInputRange labelClass="label neptune" id="IndustryCode" size="u-mb-s" onChange={props.onChange} label="Industry classification (SIC)" toggleText="Search range" value={props.initialValues.IndustryCode} /><br />
    <SelectMultipleInput labelClass="label neptune" id="EmploymentBands" size="s" value={props.initialValues.EmploymentBands} onChange={props.onChange} label="Employment Bands" bands={employmentBands} />
    <SelectMultipleInput labelClass="label neptune" id="Turnover" size="s" value={props.initialValues.Turnover} onChange={props.onChange} label="Turnover Bands" bands={turnoverBands} />
    <SelectMultipleInput labelClass="label neptune" id="TradingStatus" size="s" value={props.initialValues.TradingStatus} onChange={props.onChange} label="Trading Status Bands" bands={tradingStatusBands} />
    <SelectMultipleInput labelClass="label neptune" id="LegalStatus" size="s" value={props.initialValues.LegalStatus} onChange={props.onChange} label="Legal Status Bands" bands={legalStatusBands} />
    <Button className="btn btn--primary venus btn--wide" id="searchButton" type="submit" text="Search" onClick={props.onSubmit} ariaLabel="Search Button" loading={props.currentlySending} />
    <Button className="btn btn--secondary btn--border" id="clearButton" text="Clear" onClick={props.onClear} ariaLabel="Clear Button" type="reset" />
  </form>
);

HomeSearchForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default HomeSearchForm;
