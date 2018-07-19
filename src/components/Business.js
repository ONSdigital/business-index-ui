import React from 'react';
import PropTypes from 'prop-types';
import ChildRefList from './ChildRefList';
import withChildSearch from './ChildSearchHOC';
import { getHighlightedText } from '../utils/helperMethods';
import industryCodeDescription from '../utils/siccode';
import { employmentBands, legalStatusBands, tradingStatusBands, turnoverBands } from '../utils/convertBands';

/**
 * @class Business - A business, which displays a business and highlights
 * the businessName if one was present in the search. Conversions for the
 * bands (legal status etc.) and industry code take place here.
 *
 * As aria-expanded and data-guidance toggles don't seem to work with React
 * (or at least they haven't been initialised properly), we have to use a
 * 'hacky' workaround involving toggling the showing/hiding of references
 * ourselves.
 *
 * @todo: Use a proper spinner when the child refs are loading. I tried this
 * by setting the <LinkButton> loading prop to true, however the spinner
 * wouldn't show (inspecting the HTML showed that it was there).
 */
class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRefs: false,
      isLoading: false,
    };
  }
  isLoading = (isLoading) => this.setState({ ...this.state.isLoading, isLoading })
  render = () => {
    const ChildList = withChildSearch(ChildRefList);
    const business = this.props.business;
    const description = (industryCodeDescription[business.IndustryCode] === undefined)
    ? 'No industry code description found' : industryCodeDescription[business.IndustryCode];
    return (
      <div className="search-item-container">
        <h3 className="saturn sml-margin">{(this.props.toHighlight !== '') ? getHighlightedText(business, this.props.toHighlight) : business.BusinessName}</h3>
        <table className="mars">
          <tbody>
            <tr><th className="table-grey-text">UBRN</th><td>{business.id}</td></tr>
            <tr><th className="table-grey-text">Post code</th><td>{business.PostCode}</td></tr>
            <tr><th className="table-grey-text">Industry</th><td>{business.IndustryCode} – {description}</td></tr>
            <tr><th className="table-grey-text">Trading status</th><td>{tradingStatusBands[business.TradingStatus]}</td></tr>
            <tr><th className="table-grey-text">Legal status</th><td>{legalStatusBands[business.LegalStatus]}</td></tr>
            <tr><th className="table-grey-text">Employment band</th><td>{employmentBands[business.EmploymentBands]}</td></tr>
            <tr><th className="table-grey-text">Turnover band</th><td>{turnoverBands[business.Turnover]}</td></tr>
          </tbody>
        </table>
        <ChildList id={business.id} />
      </div>
    );
  }
}

Business.propTypes = {
  business: PropTypes.object.isRequired,
  toHighlight: PropTypes.string.isRequired,
};

export default Business;
