import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ChildRefTable from '../components/ChildRefTable';
import { employmentBands, legalStatusBands, tradingStatusBands, turnoverBands } from '../utils/convertBands';

const ResultsTable = ({ results, showFilter, showPagination, defaultPageSize, convertBands, businessName }) => {
  // https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs
  function getHighlightedText(row, higlight) {
    // Split text on higlight term, include term itself into parts, ignore case
    try {
      const parts = row.value.split(new RegExp(`(${higlight})`, 'gi'));
      // We can use the array index as a key as we already use the UBRN as part of the key
      /* eslint react/no-array-index-key: "off" */
      return (
        <span key={row.original.id}>
          {parts.map((part, i) => (
              part.toLowerCase() === higlight.toLowerCase() ?
                (<span key={`${row.original.id}-${i}`} style={{ backgroundColor: '#FFFF00' }}>
                  {part}
                </span>)
              : part),
            )
          }
        </span>);
    } catch (e) {
      // Catch the invalid regular expressions
      return (<span key={row.original.id}>{row.value}</span>);
    }
  }
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
            Cell: row => (
              (businessName !== '') ? getHighlightedText(row, businessName) : row.value
            ),
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
    </div>
  );
};

ResultsTable.defaultProps = {
  defaultPageSize: 10,
  convertBands: true,
  businessName: '',
};

ResultsTable.propTypes = {
  results: PropTypes.array.isRequired,
  showFilter: PropTypes.bool.isRequired,
  showPagination: PropTypes.bool.isRequired,
  businessName: PropTypes.string,
  defaultPageSize: PropTypes.number,
  convertBands: PropTypes.bool,
};

export default ResultsTable;
