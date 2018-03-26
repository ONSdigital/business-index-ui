import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../patterns/TextInput';
import TextInputRange from '../patterns/TextInputRange';
import Button from '../patterns/Button';
import SelectMultipleInput from '../patterns/SelectMultipleInput';
import { employmentBands, legalStatusBands, turnoverBands, tradingStatusBands } from '../utils/convertBands';

/**
 * @const SearchForm - The form for the main search. This will work for the search
 * on the homepage and results page. This isn't a functional component
 * because for refs to work, a React class has to be used.
 *
 * https://stackoverflow.com/questions/41048546/how-can-i-attach-to-a-stateless-components-ref-in-react
 */
const SearchForm = (props) => (
  <form className={`form ${props.className}`}>
    <TextInput id="BusinessName" size={props.size} onChange={props.onChange} autoFocus={props.autoFocus} type="text" label="Business name" value={props.initialValues.BusinessName} />
    <TextInput id="Id" size={props.size} onChange={props.onChange} type="text" label="UBRN" value={props.initialValues.Id} />
    <TextInput id="CompanyNo" size={props.size} onChange={props.onChange} type="text" label="CRN" value={props.initialValues.CompanyNo} />
    <TextInput id="VatRefs" size={props.size} onChange={props.onChange} type="text" label="VAT" value={props.initialValues.VatRefs} />
    <TextInput id="PayeRefs" size={props.size} onChange={props.onChange} type="text" label="PAYE" value={props.initialValues.PayeRefs} />
    <TextInput id="PostCode" size={props.size} onChange={props.onChange} type="text" label="Postcode" value={props.initialValues.PostCode} />
    <TextInputRange id="IndustryCode" size={props.size} onChange={props.onChange} label="Industry classification (SIC)" toggleText="Search range" value={props.initialValues.IndustryCode} />
    <SelectMultipleInput id="EmploymentBands" size={props.size} value={props.initialValues.EmploymentBands} onChange={props.onChange} label="Employment Bands" bands={employmentBands} />
    <SelectMultipleInput id="Turnover" size={props.size} value={props.initialValues.Turnover} onChange={props.onChange} label="Turnover Bands" bands={turnoverBands} />
    <SelectMultipleInput id="TradingStatus" size={props.size} value={props.initialValues.TradingStatus} onChange={props.onChange} label="Trading Status Bands" bands={tradingStatusBands} />
    <SelectMultipleInput id="LegalStatus" size={props.size} value={props.initialValues.LegalStatus} onChange={props.onChange} label="Legal Status Bands" bands={legalStatusBands} />
    <Button id="searchButton" type="submit" size="wide" text="Search" onClick={props.onSubmit} ariaLabel="Search Button" loading={props.currentlySending} />
    &nbsp;
    <Button id="clearButton" size="wide" text="Clear" onClick={props.onClear} ariaLabel="Clear Button" type="reset" />
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
