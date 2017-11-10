import React from 'react';
import PropTypes from 'prop-types';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { rangeSearch, setQuery, setResults } from '../actions/ApiActions';
import { SET_RANGE_QUERY, SET_RANGE_RESULTS } from '../constants/ApiConstants';
import ErrorModal from '../components/ErrorModal';
import RangeForm from '../components/RangeForm';
import SummaryTable from '../components/SummaryTable';

class RangeQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      errorMessage: '',
      formValues: {},
      values: [],
      scroll: false,
      showFilter: false,
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }
  componentDidMount() {
    // Reload the data from the store
    this.setState({ formValues: this.props.data.query });
  }
  componentWillReceiveProps(nextProps) {
    // The Redux action for the api request will set the errorMessage in the
    // store if the response is 4xx/5xx etc. Show this errorMessage in a modal,
    // props update on keypress so only show error if it has just appeared.
    if (nextProps.data.errorMessage !== '' &&
        nextProps.data.errorMessage !== this.props.data.errorMessage) {
      this.setState({
        show: true,
        errorMessage: nextProps.data.errorMessage,
        results: [],
      });
    } else {
      this.setState({ results: nextProps.data.results });
    }

    // Set the scroll flag if the user has completed a search
    if (JSON.stringify(nextProps.data.results) !== JSON.stringify(this.props.data.results)) {
      this.setState({ scroll: true });
    }
  }
  // componentWillUpdate() {
  //   if (!this.state.show) {
  //     this.child.myInput.focus();
  //   }
  // }
  componentDidUpdate() {
    // const elements = document.getElementsByClassName('Select-value-icon');
    // for (let i = 0; i <= elements.length; i += 1) {
    //   document.getElementsByClassName('Select-value-icon')[i].setAttribute('aria-hidden', 'false');
    // }
    // Scroll to the bottom of the page
    if (this.state.scroll && this.props.data.results.length > 0) {
      document.getElementById('react-table').scrollIntoView(false);
      this.setState({ scroll: false });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const query = this.state.formValues;
    if (query !== {}) {
      this.setState({ showFilter: false });
      this.props.dispatch(rangeSearch(query));
    } else {
      // Possibly swap this action with a redux way of doing it?
      this.props.data.results = 0;
      this.setState({
        results: [],
        showFilter: false,
        show: true,
        errorMessage: 'Please enter a valid VAT/PAYE/UBRN reference.',
      });
    }
  }
  clearQuery() {
    this.props.dispatch(setQuery(SET_RANGE_QUERY, {}));
    this.props.dispatch(setResults(SET_RANGE_RESULTS, { results: [] }));
    this.setState({ formValues: {}, showFilter: false });
    // Scroll to the top of the page and focus on the first input
    document.getElementsByClassName('wrapper')[0].scrollIntoView(false);
    this.child.childTextInput.myInput.focus();
  }
  changeFilter() {
    this.setState({ showFilter: !this.state.showFilter });
  }
  closeModal() {
    this.setState({ show: false, errorMessage: '' });
  }
  changeQuery(evt) {
    // if setting to empty, delete
    const formValues = this.state.formValues;
    if (evt.target.value === '' || evt.target.value[0] === '') {
      delete formValues[evt.target.id];
    } else {
      formValues[evt.target.id] = evt.target.value;
    }
    this.setState({ formValues });
    // Store the query in Redux store, so we can access it again
    this.props.dispatch(setQuery(SET_RANGE_QUERY, formValues));
  }
  render() {
    const items = [
      { name: 'Home', link: '/Home' },
      { name: 'Range Query', link: '' },
    ];
    return (
      <div>
        <BreadCrumb breadCrumbItems={items} />
        <TitleAndDescription
          marginBottom="1"
          title="Range Query"
          description="Search the Business Index on a range of fields"
        />
        <div className="page-intro background--gallery">
          <div className="wrapper">
            <RangeForm
              ref={(ch) => (this.child = ch)}
              currentlySending={this.props.data.currentlySending}
              initialValues={this.props.data.query}
              onSubmit={this.onSubmit}
              onChange={this.changeQuery}
              onChangeFilter={this.changeFilter}
              filter={this.state.showFilter}
              onClear={this.clearQuery}
              showFilter={this.props.data.results.length !== 0}
              value={this.props.data.query}
            />
            <ErrorModal
              show={this.state.show}
              message={this.state.errorMessage}
              close={this.closeModal}
            />
            <br />
            {this.props.data.results.length !== 0 &&
              <div id="react-table">
                <ReactTable
                  showPagination
                  data={this.props.data.results}
                  filterable={this.state.showFilter}
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
                      accessor: d => d.legalStatus,
                    },
                    {
                      Header: 'Trading Status',
                      id: 'tradingStatus',
                      accessor: d => d.tradingStatus,
                    },
                    {
                      Header: 'Turnover',
                      id: 'turnover',
                      accessor: d => d.turnover,
                    },
                    {
                      Header: 'Employment Bands',
                      id: 'employmentBands',
                      accessor: d => d.employmentBands,
                    },
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
                <br /><br />
                <SummaryTable
                  title="Useful Information"
                  items={[
                    { key: 'Number of results', value: this.props.data.results.length },
                    { key: 'Results capped at 10,000', value: (this.props.data.results.length === 10000) ? 'true' : 'false' },
                  ]}
                />
              </div>
            }
            <br />
          </div>
        </div>
      </div>
    );
  }
}

RangeQuery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.range,
  };
}

export default connect(select)(RangeQuery);
