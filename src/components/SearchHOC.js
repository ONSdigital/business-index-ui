import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search, setQuery, resetResults, setToHighlight } from '../actions/ApiActions';
import { SET_QUERY } from '../constants/ApiConstants';
import { formMatchQuery } from '../utils/formQuery';
import { everyKeyMatches } from '../utils/helperMethods';

// The logic for the Match/Range/UBRN features are almost identical, so we
// use a higher order component to create the pages, including the common
// methods and state. Anything that isn't common can be passed in using
// the settings or actions/constants parameters.

// https://reactjs.org/docs/higher-order-components.html
export default function withSearch(Content) {
  class SearchHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showError: false,
        errorMessage: '',
        formValues: {},
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onClear = this.onClear.bind(this);
    }
    componentDidMount = () => {
      // Reload the data from the store
      this.setState({ formValues: this.props.query });
    }
    componentWillReceiveProps = (nextProps) => {
      // The Redux action for the api request will set the errorMessage in the
      // store if the response is 4xx/5xx etc. Show this errorMessage in a modal,
      // props update on keypress so only show error if it has just appeared.
      if (nextProps.errorMessage !== '' && nextProps.errorMessage !== this.props.errorMessage) {
        this.setState({
          showError: true,
          errorMessage: nextProps.errorMessage,
          results: [],
        });
      } else {
        this.setState({ results: nextProps.results });
      }
    }
    onSubmit = (e) => {
      if ('BusinessName' in this.state.formValues) {
        this.props.dispatch(setToHighlight(this.state.formValues.BusinessName, 'match'));
      }
      e.preventDefault();
      const formValues = this.state.formValues;
      // Check that there are some values in the form
      if (Object.keys(formValues).length === 0 && formValues.constructor === Object) {
        this.props.dispatch(resetResults([], 'match')); // this.props.results = 0;
        this.setState({ showError: true, errorMessage: 'You cannot submit an empty query.' });
      } else {
        this.props.dispatch(search(this.state.formValues, formMatchQuery, 'match', true));
      }
    }
    onChange = (evt) => {
      const formValues = this.state.formValues;
      const { value, id } = evt.target;
  
      // If setting to empty, delete
      if (value.constructor === Object && everyKeyMatches(value, '')) {
        delete formValues[id];
      } else if (value === '') {
        delete formValues[id];
      } else if (Array.isArray(value) && value.length === 0) {
        // Multiple select input will return an empty array if nothing is selected
        delete formValues[id];
      } else {
        // Do some last transformations on the form values before adding them to
        // our formValues state
        if (id === 'BusinessName' || id === 'PostCode') {
          formValues[id] = value.toUpperCase();
        } else {
          formValues[id] = value;
        }
      }
      this.setState({ formValues });
      
      // Store the query in Redux store, so we can access it again if a user
      // presses 'back to search' on the Enterprise View page.
      this.props.dispatch(setQuery(SET_QUERY, formValues, 'match'));
    }
    onClear = () => {
      this.props.dispatch(setQuery(SET_QUERY, {}, 'match'));
      this.setState({ formValues: {} });
    }
    closeModal = () => this.setState({ showError: false, errorMessage: '' });
    render() {
      return (
        <Content
          showError={this.state.showError}
          onChange={this.onChange}
          onClear={this.onClear}
          onSubmit={this.onSubmit}
          closeModal={this.closeModal}
          ref={(ch) => (this.child = ch)}
          currentlySending={this.props.currentlySending}
          query={this.props.query}
          errorMessage={this.state.errorMessage}
          results={this.props.results}
          toHighlight={this.props.toHighlight}
        />
      );
    }
  }

  const select = (state) => ({
    currentlySending: state.apiSearch.match.currentlySending,
    query: state.apiSearch.match.query,
    results: state.apiSearch.match.results,
    errorMessage: state.apiSearch.match.errorMessage,
    toHighlight: state.apiSearch.match.toHighlight,
  });

  SearchHOC.propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentlySending: PropTypes.bool.isRequired,
    query: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
    errorMessage: PropTypes.string.isRequired,
    toHighlight: PropTypes.string.isRequired,
  };

  return connect(select)(SearchHOC);
}
