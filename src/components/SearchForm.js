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
class SearchForm extends React.Component {
  render = () => (
    <form className={this.props.className}>
      <TextInput id="BusinessName" size={`u-mb-${this.props.size}`} onChange={this.props.onChange} autoFocus={this.props.autoFocus} type="bi-search-input" label="Business name" value={this.props.initialValues.BusinessName} ref={ip => (this.childTextInput = ip)} />
      <TextInput labelClass="label__description" legend="Reference number" id="Id" size={`u-mb-${this.props.size}`} onChange={this.props.onChange} type="bi-search-input" label="Unique Business Reference Number (UBRN)" value={this.props.initialValues.Id} />
      <TextInput labelClass="label__description" id="CompanyNo" size={`u-mb-${this.props.size}`} onChange={this.props.onChange} type="bi-search-input" label="Company Number (CN)" value={this.props.initialValues.CompanyNo} />
      <TextInput labelClass="label__description" id="VatRefs" size={`u-mb-${this.props.size}`} onChange={this.props.onChange} type="bi-search-input" label="Value-Added Tax (VAT)" value={this.props.initialValues.VatRefs} />
      <TextInput labelClass="label__description" id="PayeRefs" size={`u-mb-${this.props.size}`} onChange={this.props.onChange} type="bi-search-input" label="Pay As You Earn (PAYE)" value={this.props.initialValues.PayeRefs} />
      <TextInput id="PostCode" size={`u-mb-${this.props.size}`} onChange={this.props.onChange} type="bi-postcode-input" label="Postcode" value={this.props.initialValues.PostCode} />
      <TextInputRange id="IndustryCode" size={`u-mb-${this.props.size}`} onChange={this.props.onChange} label="Industry classification (SIC)" toggleText="Search range" value={this.props.initialValues.IndustryCode} />
      <SelectMultipleInput id="EmploymentBands" size={this.props.size} value={this.props.initialValues.EmploymentBands} onChange={this.props.onChange} label="Employment Bands" bands={employmentBands} />
      <SelectMultipleInput id="Turnover" size={this.props.size} value={this.props.initialValues.Turnover} onChange={this.props.onChange} label="Turnover Bands" bands={turnoverBands} />
      <SelectMultipleInput id="TradingStatus" size={this.props.size} value={this.props.initialValues.TradingStatus} onChange={this.props.onChange} label="Trading Status Bands" bands={tradingStatusBands} />
      <SelectMultipleInput id="LegalStatus" size={this.props.size} value={this.props.initialValues.LegalStatus} onChange={this.props.onChange} label="Legal Status Bands" bands={legalStatusBands} />
      <Button className="btn btn--primary venus btn--wide" id="searchButton" type="submit" text="Search" onClick={this.props.onSubmit} ariaLabel="Search Button" loading={this.props.currentlySending} />
      <Button className="btn btn--secondary btn--border" id="clearButton" text="Clear" onClick={this.props.onClear} ariaLabel="Clear Button" type="reset" />
    </form>
  );
}

SearchForm.defaultProps = {
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
  className: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
};

export default SearchForm;
