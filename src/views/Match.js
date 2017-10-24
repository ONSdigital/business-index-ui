import React from 'react';
import PropTypes from 'prop-types';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { matchSearch, setQuery } from '../actions/ApiActions';
import { SET_MATCH_QUERY } from '../constants/ApiConstants';
import ErrorModal from '../components/ErrorModal';
import MatchForm from '../components/MatchForm';
import { validateUBRNSearch } from '../utils/validation';

class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      errorMessage: '',
      formValues: {},
      results: [],
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
    // this.getDefaultSize = this.getDefaultSize.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
  }
  // componentWillUpdate() {
  //   if (!this.state.show) {
  //     this.child.myInput.focus();
  //   }
  // }
  onSubmit(e) {
    e.preventDefault();
    if (this.state.formValues !== {}) {
      this.props.dispatch(matchSearch(this.state.formValues));
    } else {
      // Possibly swap this action with a redux way of doing it?
      this.props.data.results = 0;
      this.setState({
        results: [],
        show: true,
        errorMessage: 'Please enter a valid VAT/PAYE/UBRN reference.',
      });
    }
  }
  closeModal() {
    this.setState({ show: false, errorMessage: '' });
  }
  clearQuery() {
    console.log('clearing query...')
    this.props.dispatch(setQuery(SET_MATCH_QUERY, {}));
  }
  changeQuery(evt) {
    // if setting to empty, delete
    const formValues = this.state.formValues;
    if (evt.target.value === '') {
      delete formValues[evt.target.id];
    } else {
      formValues[evt.target.id] = evt.target.value;
    }
    this.setState({ formValues });
    //console.log(formValues);
    // Store the query in Redux store, so we can access it again if a user
    // presses 'back to search' on the Enterprise View page.
    this.props.dispatch(setQuery(SET_MATCH_QUERY, formValues));
  }
  render() {
    const items = [
      { name: 'Home', link: '/Home' },
      { name: 'Match', link: '' },
    ];
    return (
      <div>
        <BreadCrumb breadCrumbItems={items} />
        <TitleAndDescription
          marginBottom="1"
          title="Match Search"
          description="Search the Business Index on business name."
        />
        <div className="page-intro background--gallery">
          <div className="wrapper">
            <MatchForm
              ref={(ch) => (this.child = ch)}
              currentlySending={this.props.data.currentlySending}
              initialValues={this.props.data.query}
              onSubmit={this.onSubmit}
              onChange={this.changeQuery}
              onClear={this.clearQuery}
              value={this.props.data.query}
              valid={validateUBRNSearch(this.props.data.query.length)}
            />
            <ErrorModal
              show={this.state.show}
              message={this.state.errorMessage}
              close={this.closeModal}
            />
            <br />
            {this.props.data.results.length !== 0 &&
              <ReactTable
                showPagination
                data={this.props.data.results}
                filterable
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
                    Header: 'UPRN',
                    id: 'uprn',
                    accessor: d => d.uprn,
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
            }
            <br />
          </div>
        </div>
      </div>
    );
  }
}

Match.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.match,
  };
}

export default connect(select)(Match);
