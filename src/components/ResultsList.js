import React from 'react';
import PropTypes from 'prop-types';
import Business from './Business';

/**
 * @class ResultsList
 *
 * @param {Array} results - An array of objects from the API
 * @param {String} toHighlight - The search term to highlight (businessName)
 */
const ResultsList = ({ results, toHighlight }) => {
  // Scroll to the top of the page
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  return (
    <section>
      {
        results.slice(0, 10)
          .map(item => <Business key={item.id} business={item} toHighlight={toHighlight} />)
      }
    </section>
  );
};

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  toHighlight: PropTypes.string.isRequired,
};

export default ResultsList;
