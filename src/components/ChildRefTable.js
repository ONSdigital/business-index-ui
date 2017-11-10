import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import ErrorModal from '../components/ErrorModal';

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
    fetch(`http://localhost:9000/v1/business/${row.original.id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    })
    .then(data => this.setState({ data: [data], isLoading: false }))
    .catch(error => this.setState({ errorMessage: error.message, error: true, isLoading: false }));
  }
  closeModal() {
    this.setState({ error: false, errorMessage: '' });
  }
  render() {
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
          defaultPageSize={1}
          loading={this.state.isLoading}
          className="-striped -highlight"
          showPaginationTop={false}
          showPaginationBottom={false}
        />
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
