import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ChildRefTable from '../components/ChildRefTable';
import { getHighlightedText } from '../utils/helperMethods';
import { employmentBands, legalStatusBands, tradingStatusBands, turnoverBands } from '../utils/convertBands';

/**
 * @const ResultsTable - The main table of results from the Business Index API, with
 * child refs being displayed in an expandable row.
 */
const ResultsTable = (props) => (
  <div id="react-table">
    <ReactTable
      showPagination={props.showPagination}
      data={props.results}
      filterable={props.showFilter}
      columns={[
        {
          Header: 'UBRN',
          id: 'id',
          accessor: d => d.id,
        },
        {
          Header: 'Business Name',
          id: 'businessName',
          accessor: d => d.businessName,
          Cell: row => ((props.toHighlight !== '') ? getHighlightedText({ businessName: row.value, id: row.id }, props.toHighlight) : row.value),
        },
        {
          Header: 'PostCode',
          id: 'postCode',
          accessor: d => d.postCode,
        },
        {
          Header: 'Industry Code',
          id: 'industryCode',
          accessor: d => d.industryCode,
        },
        {
          Header: 'Legal Status',
          id: 'legalStatus',
          accessor: d => ((props.convertBands) ? legalStatusBands[d.legalStatus] : d.legalStatus),
        },
        {
          Header: 'Trading Status',
          id: 'tradingStatus',
          accessor: d => ((props.convertBands) ? tradingStatusBands[d.tradingStatus] : d.tradingStatus),
        },
        {
          Header: 'Turnover',
          id: 'turnover',
          accessor: d => ((props.convertBands) ? turnoverBands[d.turnover] : d.turnover),
        },
        {
          Header: 'Employment Bands',
          id: 'employmentBands',
          accessor: d => ((props.convertBands) ? employmentBands[d.employmentBands] : d.employmentBands),
        },
      ]}
      defaultPageSize={props.defaultPageSize}
      className="-striped -highlight"
      SubComponent={row => <ChildRefTable row={row} />}
    />
  </div>
);

ResultsTable.defaultProps = {
  defaultPageSize: 10,
  convertBands: true,
  toHighlight: '',
};

ResultsTable.propTypes = {
  results: PropTypes.array.isRequired,
  showFilter: PropTypes.bool.isRequired,
  showPagination: PropTypes.bool.isRequired,
  toHighlight: PropTypes.string,
  defaultPageSize: PropTypes.number,
  convertBands: PropTypes.bool,
};

export default ResultsTable;
