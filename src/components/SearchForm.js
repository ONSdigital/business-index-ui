import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../patterns/TextInput';
import TextInputRange from '../patterns/TextInputRange';
import Button from '../patterns/Button';
import SelectMultipleInput from '../patterns/SelectMultipleInput';
import { employmentBands, legalStatusBands, turnoverBands, tradingStatusBands } from '../utils/convertBands';

/**
 * @const SearchForm - The form for the main search. This will work for the search
 * on the homepage and results page.
 */
const SearchForm = ({ currentlySending, size, onSubmit, onChange, onClear, initialValues, className, autoFocus }) => (
  <form className={`form ${className}`}>
    <TextInput id="BusinessName" size={size} onChange={onChange} autoFocus={autoFocus} type="text" label="Business name" value={initialValues.BusinessName} />
    <TextInput id="Id" size={size} onChange={onChange} type="text" label="UBRN" value={initialValues.Id} />
    <TextInput id="CompanyNo" size={size} onChange={onChange} type="text" label="CRN" value={initialValues.CompanyNo} />
    <TextInput id="VatRefs" size={size} onChange={onChange} type="text" label="VAT" value={initialValues.VatRefs} />
    <TextInput id="PayeRefs" size={size} onChange={onChange} type="text" label="PAYE" value={initialValues.PayeRefs} />
    <TextInput id="PostCode" size={size} onChange={onChange} type="text" label="Postcode" value={initialValues.PostCode} />
    <TextInputRange id="IndustryCode" size={size} onChange={onChange} label="Industry classification (SIC)" toggleText="Search range" value={initialValues.IndustryCode} />
    <SelectMultipleInput id="EmploymentBands" size={size} value={initialValues.EmploymentBands} onChange={onChange} label="Employment Bands" bands={employmentBands} />
    <SelectMultipleInput id="Turnover" size={size} value={initialValues.Turnover} onChange={onChange} label="Turnover Bands" bands={turnoverBands} />
    <SelectMultipleInput id="TradingStatus" size={size} value={initialValues.TradingStatus} onChange={onChange} label="Trading Status Bands" bands={tradingStatusBands} />
    <SelectMultipleInput id="LegalStatus" size={size} value={initialValues.LegalStatus} onChange={onChange} label="Legal Status Bands" bands={legalStatusBands} />
    <Button id="searchButton" type="submit" size="wide" text="Search" onClick={onSubmit} ariaLabel="Search Button" loading={currentlySending} />
    &nbsp;
    <Button id="clearButton" size="wide" text="Clear" onClick={onClear} ariaLabel="Clear Button" type="reset" />
  </form>
);

SearchForm.defaultProps = {
  className: '',
  size: 's',
  autoFocus: false,
};

SearchForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  size: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default SearchForm;
