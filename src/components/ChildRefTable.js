import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import ErrorModal from '../components/ErrorModal';
import industryCodeDescription from '../utils/siccode';
import { formatData } from '../utils/helperMethods';

/**
 * @class ChildRefTable - This is a sub table shown as an expandable row
 * within the main ReactTable results table. When this component is created,
 * the data will be fetched. Redux isn't used as the data is only required
 * by this component. This component is only ever used as a child of
 * ChildSearchHOC, which provides the correct fetchData related props.
 */
class ChildRefTable extends React.Component {
  componentDidMount = () => this.props.fetchData();
  render = () => {
    const business = this.props.data;
    const description = (industryCodeDescription[business.industryCode] === undefined)
      ? 'No industry code description found' : industryCodeDescription[business.industryCode];
    const formattedData = (this.props.finishedLoading) ? formatData(this.props.data) : [];
    return (
      <div style={{ padding: '20px' }}>
        <ReactTable
          data={formattedData}
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
          pageSize={formattedData.length}
          loading={this.props.isLoading}
          className="-striped -highlight"
          showPaginationTop={false}
          showPaginationBottom={false}
        />
        <br />
        <p>Industry Code [{business.industryCode}]: {description}</p>
        <ErrorModal show={this.props.error} message={this.props.errorMessage} close={this.props.closeModal} />
      </div>
    );
  }
}

ChildRefTable.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  finishedLoading: PropTypes.bool.isRequired,
};

export default ChildRefTable;
