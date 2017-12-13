import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import SummaryTable from '../components/SummaryTable';
import ChildRefTable from '../components/ChildRefTable';
import { employmentBands, legalStatusBands, tradingStatusBands, turnoverBands } from '../utils/convertBands';
import { downloadCSV, downloadJSON } from '../utils/export';

const ResultsTable = ({ results, showFilter, showPagination, defaultPageSize, convertBands, businessName }) => {
  // https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs
  function getHighlightedText(text, higlight) {
    // Split text on higlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${higlight})`, 'gi'));
    return (<span key={text}>{parts.map(part => part.toLowerCase() === higlight.toLowerCase() ? <span style={{ backgroundColor: '#FFFF00' }}>{part}</span> : part)}</span>);
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
              (businessName !== '') ? getHighlightedText(row.value, businessName) : row.value
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
      <br />
      <div className="sdc-isolation">
        <div className="summary">
          <h2 className="summary__title saturn" id="">Export Results</h2>
          <button className="btn btn--secondary" onClick={() => downloadCSV(results)}>Save as CSV</button>
          &nbsp;
          <button className="btn btn--secondary" onClick={() => downloadJSON(results)}>Save as JSON</button>
        </div>
      </div>
      <br />
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
