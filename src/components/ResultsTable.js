import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import withChildSearch from './ChildSearchHOC';
import ChildRefTable from '../components/ChildRefTable';
import { getHighlightedText } from '../utils/helperMethods';
import { employmentBands, legalStatusBands, tradingStatusBands, turnoverBands } from '../utils/convertBands';

/**
 * @const ResultsTable - The main table of results from the Business Index API, with
 * child refs being displayed in an expandable row.
 */
const ResultsTable = (props) => {
  const ChildTable = withChildSearch(ChildRefTable);
  return (
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
            width: 150,
          },
          {
            Header: 'Business Name',
            id: 'BusinessName',
            accessor: d => d.BusinessName,
            Cell: row => ((props.toHighlight !== '') ? getHighlightedText({ BusinessName: row.value, id: row.id }, props.toHighlight) : row.value),
            width: 400,
          },
          {
            Header: 'PostCode',
            id: 'PostCode',
            accessor: d => d.PostCode,
            width: 110,
          },
          {
            Header: 'SIC',
            id: 'IndustryCode',
            accessor: d => d.IndustryCode,
            width: 75,
          },
          {
            Header: 'Legal Status',
            id: 'LegalStatus',
            accessor: d => ((props.convertBands) ? legalStatusBands[d.LegalStatus] : d.LegalStatus),
            width: 150,
          },
          {
            Header: 'Trading Status',
            id: 'TradingStatus',
            accessor: d => ((props.convertBands) ? tradingStatusBands[d.TradingStatus] : d.TradingStatus),
            width: 150,
          },
          {
            Header: 'Turnover',
            id: 'Turnover',
            accessor: d => ((props.convertBands) ? turnoverBands[d.Turnover] : d.Turnover),
            width: 100,
          },
          {
            Header: 'Employment',
            id: 'RmploymentBands',
            accessor: d => ((props.convertBands) ? employmentBands[d.EmploymentBands] : d.EmploymentBands),
            width: 100,
          },
        ]}
        defaultPageSize={props.defaultPageSize}
        className="-striped -highlight"
        SubComponent={row => <ChildTable id={row.original.id} />}
      />
    </div>
  );
}

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
