import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import SummaryTable from '../components/SummaryTable';
import ChildRefTable from '../components/ChildRefTable';
import { employmentBands, legalStatusBands, tradingStatusBands, turnoverBands } from '../utils/convertBands';

const ResultsTable = ({ results, showFilter, showPagination, defaultPageSize, convertBands }) => {
  return (
    <div id="react-table">
      <ReactTable
        showPagination={showPagination}
        data={results}
        filterable={showFilter}
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
            accessor: d => ((convertBands) ? legalStatusBands[d.legalStatus] : d.legalStatus),
          },
          {
            Header: 'Trading Status',
            id: 'tradingStatus',
            accessor: d => ((convertBands) ? tradingStatusBands[d.tradingStatus] : d.tradingStatus),
          },
          {
            Header: 'Turnover',
            id: 'turnover',
            accessor: d => ((convertBands) ? turnoverBands[d.turnover] : d.turnover),
          },
          {
            Header: 'Employment Bands',
            id: 'employmentBands',
            accessor: d => ((convertBands) ? employmentBands[d.employmentBands] : d.employmentBands),
          },
        ]}
        defaultPageSize={defaultPageSize}
        className="-striped -highlight"
        SubComponent={row => {
          return (
            <ChildRefTable row={row} />
          );
        }}
      />
      <br /><br />
      <SummaryTable
        title="Useful Information"
        items={[
          { key: 'Number of results', value: results.length },
          { key: 'Results capped at 10,000', value: (results.length === 10000) ? 'true' : 'false' },
        ]}
      />
    </div>
  );
};

ResultsTable.defaultProps = {
  defaultPageSize: 10,
  convertBands: true,
};

ResultsTable.propTypes = {
  results: PropTypes.array.isRequired,
  showFilter: PropTypes.bool.isRequired,
  showPagination: PropTypes.bool.isRequired,
  defaultPageSize: PropTypes.number,
  convertBands: PropTypes.bool,
};

export default ResultsTable;
