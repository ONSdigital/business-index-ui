import React from 'react';
import PropTypes from 'prop-types';
import LinkButton from '../patterns/LinkButton';

/**
 * @const Pagination - This component handles the pagination for the results
 * list. It relies on page state in the parent component.
 */
const Pagination = ({ onChange, page, pageSize, numPages }) => (
  <div style={{ marginTop: '20px' }}>
    <div style={{ margin: '0 auto', display: 'table', marginBottom: '-20px' }}>
      <LinkButton id="prevButton" className="mars" text="Previous" onClick={() => onChange(-pageSize)} loading={false} />
      <p style={{ display: 'table-cell', paddingLeft: '20px', paddingRight: '20px' }}>Page {page} of {numPages}</p>
      <LinkButton id="nextButton" className="mars" text="Next" onClick={() => onChange(pageSize)} loading={false} />
    </div>
  </div>
);

Pagination.propTypes = {
  onChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
};

export default Pagination;
