import React from 'react';
import PropTypes from 'prop-types';
import { getHighlightedText } from '../utils/helperMethods';
import industryCodeDescription from '../utils/siccode';
import { employmentBands, legalStatusBands, tradingStatusBands, turnoverBands } from '../utils/convertBands';

/**
 * @const Business - A business
 *
 * @param {Object} business - Wide or thin
 * @param {String} toHighlight - The search term to highlight (businessName)
 *
 * @return {Object}
 */
const Business = ({ business, toHighlight }) => {
  const description = (industryCodeDescription[business.industryCode] === undefined)
  ? 'No industry code description found' : industryCodeDescription[business.industryCode];
  return (
    <div className="search-item-container">
      <h3 className="saturn sml-margin">{(toHighlight !== '') ? getHighlightedText(business, toHighlight) : business.businessName}</h3>
      <table className="mars">
        <tr><th className="table-grey-text">UBRN</th><td>{business.id}</td></tr>
        <tr><th className="table-grey-text">Address</th><td>123 Mini Street, Exeter, EX13 8DD</td></tr>
        <tr><th className="table-grey-text">Industry</th><td>{business.industryCode} – {description}</td></tr>
        <tr><th className="table-grey-text">Trading status</th><td>{tradingStatusBands[business.tradingStatus]}</td></tr>
        <tr><th className="table-grey-text">Legal status</th><td>{legalStatusBands[business.legalStatus]}</td></tr>
        <tr><th className="table-grey-text">Employment band</th><td>{employmentBands[business.employmentBands]}</td></tr>
        <tr><th className="table-grey-text">Turnover band</th><td>{turnoverBands[business.turnover]}</td></tr>
      </table>
      <div className="guidance js-details" data-show-label="Show reference numbers" data-hide-label="Hide reference numbers">
        <a className="guidance__link js-details-trigger js-details-label mars" aria-controls="guidance-answer" aria-expanded="false" id="guidance-trigger" data-guidance-trigger="true" href="#guidance-answer">Show reference numbers</a>
        <div className="guidance__main js-details-body" id="guidance-answer-body" aria-hidden="true">
          <div className="guidance__content new">
            <table>
              <tr>
                <th className="table-grey-text-reveal">VAT</th>
                <td>32098007900</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Business.propTypes = {
  business: PropTypes.object.isRequired,
  toHighlight: PropTypes.string.isRequired,
};

export default Business;
