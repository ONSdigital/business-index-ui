import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search, setQuery, resetResults, setToHighlight } from '../actions/ApiActions';
import { SET_QUERY } from '../constants/ApiConstants';
import { formMatchQuery } from '../utils/formQuery';
import { handleFormChange } from '../utils/helperMethods';

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
        formValues: this.props.query,
      };
    }
    onSubmit = (e) => {
      e.preventDefault();
      const formValues = this.state.formValues;
      const businessName = ('BusinessName' in formValues) ? formValues.BusinessName : '';
      this.props.dispatch(setToHighlight(businessName, 'match'));

      // Check that there are some values in the form
      if (Object.keys(formValues).length === 0 && formValues.constructor === Object) {
        this.props.dispatch(resetResults([], 'match'));
        this.setState({ showError: true, errorMessage: 'You cannot submit an empty query.' });
      } else {
        this.props.dispatch(search(formValues, formMatchQuery, 'match', true));
      }
    }
    onChange = (evt) => {
      const { value, id } = evt.target;
      const formValues = handleFormChange(this.state.formValues, id, value);
      this.setState({ formValues });
      this.props.dispatch(setQuery(SET_QUERY, formValues, 'match'));
    }
    onClear = () => {
      this.props.dispatch(setQuery(SET_QUERY, {}, 'match'));
      this.setState({ formValues: {} });
    }
    closeModal = () => this.setState({ showError: false, errorMessage: '' });
    render = () => (
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
    )
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
    toHighlight: PropTypes.string.isRequired,
  };

  return connect(select)(SearchHOC);
}
