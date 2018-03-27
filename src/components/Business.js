import React from 'react';
import PropTypes from 'prop-types';
import ChildRefList from './ChildRefList';
import { getHighlightedText } from '../utils/helperMethods';
import industryCodeDescription from '../utils/siccode';
import { employmentBands, legalStatusBands, tradingStatusBands, turnoverBands } from '../utils/convertBands';
import Arrow from '../resources/img/icons--chevron-down.svg';

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
  showRefs = () => {
    const toggle = document.getElementById('toggleLink');
    toggle.style.transform = (toggle.style.transform === 'rotate(-90deg)') ? '' : 'rotate(-90deg)';
    this.setState({ ...this.state.showRefs, showRefs: !this.state.showRefs });
  }
  render = () => {
    const expandText = ((!this.state.showRefs) ? 'Show references' : 'Hide references');
    const business = this.props.business;
    const description = (industryCodeDescription[business.industryCode] === undefined)
    ? 'No industry code description found' : industryCodeDescription[business.industryCode];
    return (
      <div className="search-item-container">
        <h3 className="saturn sml-margin">{(this.props.toHighlight !== '') ? getHighlightedText(business, this.props.toHighlight) : business.businessName}</h3>
        <table className="mars">
          <tbody>
            <tr><th className="table-grey-text">UBRN</th><td>{business.id}</td></tr>
            <tr><th className="table-grey-text">Post code</th><td>{business.postCode}</td></tr>
            <tr><th className="table-grey-text">Industry</th><td>{business.industryCode} – {description}</td></tr>
            <tr><th className="table-grey-text">Trading status</th><td>{tradingStatusBands[business.tradingStatus]}</td></tr>
            <tr><th className="table-grey-text">Legal status</th><td>{legalStatusBands[business.legalStatus]}</td></tr>
            <tr><th className="table-grey-text">Employment band</th><td>{employmentBands[business.employmentBands]}</td></tr>
            <tr><th className="table-grey-text">Turnover band</th><td>{turnoverBands[business.turnover]}</td></tr>
          </tbody>
        </table>
        <div id="outerExpand" className="guidance js-details" dataShowLabel="Show reference numbers" dataHideLabel="Hide reference numbers">
          <a className="mars" style={{ cursor: 'pointer' }} onClick={this.showRefs}>
            <img src={Arrow} id="toggleLink" style={{ transform: 'rotate(-90deg)', height: '20px' }} />
            {(this.state.isLoading) ? 'Loading...' : expandText}
          </a>
          {this.state.showRefs &&
            <ChildRefList id={business.id} onLoad={this.isLoading} />
          }
        </div>
      </div>
    );
  }
}

Business.propTypes = {
  business: PropTypes.object.isRequired,
  toHighlight: PropTypes.string.isRequired,
};

export default Business;
