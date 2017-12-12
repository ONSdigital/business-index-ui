import React from 'react';
import PropTypes from 'prop-types';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';
import { connect } from 'react-redux';
import { ubrnSearch, setQuery, setResults } from '../actions/ApiActions';
import { SET_UBRN_QUERY, SET_UBRN_RESULTS } from '../constants/ApiConstants';
import ErrorModal from '../components/ErrorModal';
import UBRNForm from '../components/UBRNForm';
import { validateUBRNSearch } from '../utils/validation';
import ResultsTable from '../components/ResultsTable';

class UBRNLookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      errorMessage: '',
      results: [],
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
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
  onSubmit(e) {
    e.preventDefault();
    const query = this.props.data.query;
    if (validateUBRNSearch(this.props.data.query) === 'success') {
      this.props.dispatch(ubrnSearch(query.toUpperCase()));
    } else {
      // Possibly swap this action with a redux way of doing it?
      //this.props.data.results = [];
      this.setState({
        results: [],
        show: true,
        errorMessage: 'Please enter a valid UBRN number.',
      });
    }
  }
  focusAndScroll() {
    // Scroll to the top of the page and focus on the first input
    document.getElementsByClassName('wrapper')[0].scrollIntoView(false);
    this.child.childTextInput.myInput.focus();
  }
  clearQuery() {
    this.props.dispatch(setQuery(SET_UBRN_QUERY, ''));
    this.props.dispatch(setResults(SET_UBRN_RESULTS, { results: [] }));
    this.focusAndScroll();
  }
  closeModal() {
    this.setState({ show: false, errorMessage: '' });
    this.focusAndScroll();
  }
  changeQuery(evt) {
    // Store the query in Redux store, so we can access it again if a user
    // presses 'back to search' on the Enterprise View page.
    this.props.dispatch(setQuery(SET_UBRN_QUERY, evt.target.value));
  }
  render() {
    const items = [
      { name: 'Home', link: '/Home' },
      { name: 'UBRN Lookup', link: '' },
    ];
    return (
      <div>
        <BreadCrumb breadCrumbItems={items} />
        <TitleAndDescription
          marginBottom="1"
          title="UBRN Lookup"
          description="Search the Business Index for a Unique Business Reference Number."
        />
        <div className="page-intro background--gallery">
          <div className="wrapper">
            <UBRNForm
              ref={(ch) => (this.child = ch)}
              currentlySending={this.props.data.currentlySending}
              onSubmit={this.onSubmit}
              onChange={this.changeQuery}
              value={this.props.data.query}
              valid={validateUBRNSearch(this.props.data.query)}
              onClear={this.clearQuery}
            />
            <ErrorModal
              show={this.state.show}
              message={this.state.errorMessage}
              close={() => this.closeModal}
            />
            <br />
            {this.props.data.results.length !== 0 &&
              <ResultsTable
                results={[this.props.data.results]}
                showFilter={false}
                showPagination={false}
                defaultPageSize={1}
              />
            }
            <br />
          </div>
        </div>
      </div>
    );
  }
}

UBRNLookup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.ubrn,
  };
}

export default connect(select)(UBRNLookup);
