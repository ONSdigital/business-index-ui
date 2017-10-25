import React from 'react';
import PropTypes from 'prop-types';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';
import { connect } from 'react-redux';
import { rangeSearch, setQuery, setResults } from '../actions/ApiActions';
import { SET_RANGE_QUERY, SET_RANGE_RESULTS } from '../constants/ApiConstants';
import ErrorModal from '../components/ErrorModal';
import RangeForm from '../components/RangeForm';

class RangeQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      errorMessage: '',
      formValues: {},
      values: [],
      showFilter: false,
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  onSubmit() {
    console.log('submitting...');
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
  componentDidUpdate() {
    // const elements = document.getElementsByClassName('Select-value-icon');
    // for (let i = 0; i <= elements.length; i += 1) {
    //   document.getElementsByClassName('Select-value-icon')[i].setAttribute('aria-hidden', 'false');
    // }
  }
  onSubmit(e) {
    e.preventDefault();
    const query = this.props.data.query;
    if (query.length > 5 && query.length < 13) {
      this.props.dispatch(rangeSearch(query.toUpperCase()));
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
  clearQuery() {
    this.props.dispatch(setQuery(SET_RANGE_QUERY, {}));
    this.props.dispatch(setResults(SET_RANGE_RESULTS, { results: [] }));
    this.setState({ formValues: {} });
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
    if (evt.target.value === '') {
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
