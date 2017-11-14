import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import ErrorModal from '../components/ErrorModal';
import industryCodeDescription from '../utils/siccode';
import config from '../config/api-urls';
import { formatData } from '../utils/helperMethods';

const { REROUTE_URL, API_VERSION, BUSINESS_ENDPOINT } = config;

class ChildRefTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      error: false,
      errorMessage: '',
    };
    this.closeModal = this.closeModal.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData(this.props.row);
  }
  fetchData(row) {
    fetch(`${REROUTE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        method: 'GET',
        endpoint: `${API_VERSION}/${BUSINESS_ENDPOINT}/${row.original.id}`,
      }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    })
    .then(data => this.setState({ data: formatData(data), isLoading: false }))
    .catch(error => this.setState({ errorMessage: error.message, error: true, isLoading: false }));
  }
  closeModal() {
    this.setState({ error: false, errorMessage: '' });
  }
  render() {
    const business = this.props.row.original;
    const description = (industryCodeDescription[business.industryCode] === undefined)
      ? 'No industry code description found' : industryCodeDescription[business.industryCode];
    return (
      <div style={{ padding: '20px' }}>
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: 'Company Number',
              accessor: 'companyNo',
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
          pageSize={this.state.data.length}
          loading={this.state.isLoading}
          className="-striped -highlight"
          showPaginationTop={false}
          showPaginationBottom={false}
        />
        <h4>Industry Code [{business.industryCode}]: {description}</h4>
        <ErrorModal
          show={this.state.error}
          message={this.state.errorMessage}
          close={this.closeModal}
        />
      </div>
    );
  }
}

ChildRefTable.propTypes = {
  row: PropTypes.object.isRequired,
};

export default ChildRefTable;
