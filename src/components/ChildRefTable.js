import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import ErrorModal from '../components/ErrorModal';
import industryCodeDescription from '../utils/siccode';

/**
 * @class ChildRefTable - This is a sub table shown as an expandable row
 * within the main ReactTable results table. When this component is created,
 * the data will be fetched. Redux isn't used as the data is only required
 * by this component.
 */
const ChildRefTable = ({ data, isLoading, error, errorMessage, closeModal }) => {
  const business = this.props.row.original;
  const description = (industryCodeDescription[business.industryCode] === undefined)
    ? 'No industry code description found' : industryCodeDescription[business.industryCode];
  return (
    <div style={{ padding: '20px' }}>
      <ReactTable
        data={data}
        columns={[
          {
            Header: 'Company Number',
            accessor: 'companyNo',
            Cell: row => (
              <a target="_blank" rel="noopener noreferrer" href={`http://data.companieshouse.gov.uk/doc/company/${row.value}`}>{row.value}</a>
            ),
          },
          {
            Header: 'VAT References',
            accessor: 'vatRefs',
          },
          {
            Header: 'PAYE References',
            accessor: 'payeRefs',
          },
        ]}
        pageSize={data.length}
        loading={isLoading}
        className="-striped -highlight"
        showPaginationTop={false}
        showPaginationBottom={false}
      />
      <br />
      <h4>Industry Code [{business.industryCode}]: {description}</h4>
      <ErrorModal
        show={error}
        message={errorMessage}
        close={closeModal}
      />
    </div>
  );
};

ChildRefTable.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ChildRefTable;
