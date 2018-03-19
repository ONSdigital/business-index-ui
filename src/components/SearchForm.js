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
 *
 * @return {Object} - The SearchForm component
 */
class SearchForm extends React.Component {
  render = () => (
    <form className={`form ${this.props.className}`}>
      <TextInput id="BusinessName" size={this.props.size} onChange={this.props.onChange} autoFocus={this.props.autoFocus} type="search" label="Business name, CRN, VAT, PAYE or UBRN" value={this.props.initialValues.BusinessName} ref={ip => (this.childTextInput = ip)} />
      <TextInput id="PostCode" size={this.props.size} onChange={this.props.onChange} type="postcode" label="Postcode" value={this.props.initialValues.PostCode} />
      <TextInputRange id="IndustryCode" size={this.props.size} onChange={this.props.onChange} label="Industry classification (SIC)" toggleText="Search range" value={this.props.initialValues.IndustryCode} />
      <SelectMultipleInput id="EmploymentBands" size={this.props.size} value={this.props.initialValues.EmploymentBands} onChange={this.props.onChange} label="Employment Bands" bands={employmentBands} />
      <SelectMultipleInput id="Turnover" size={this.props.size} value={this.props.initialValues.Turnover} onChange={this.props.onChange} label="Turnover Bands" bands={turnoverBands} />
      <SelectMultipleInput id="TradingStatus" size={this.props.size} value={this.props.initialValues.TradingStatus} onChange={this.props.onChange} label="Trading Status Bands" bands={tradingStatusBands} />
      <SelectMultipleInput id="LegalStatus" size={this.props.size} value={this.props.initialValues.LegalStatus} onChange={this.props.onChange} label="Legal Status Bands" bands={legalStatusBands} />
      <Button id="searchButton" type="submit" size="wide" text="Search" onClick={this.props.onSubmit} ariaLabel="Search Button" loading={this.props.currentlySending} />
      &nbsp;
      <Button id="clearButton" size="wide" text="Clear" onClick={this.props.onClear} ariaLabel="Clear Button" type="reset" />
    </form>
  );
}

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
