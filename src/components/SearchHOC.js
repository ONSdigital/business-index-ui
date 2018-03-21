import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search, setQuery, resetResults, setToHighlight } from '../actions/ApiActions';
import { SET_QUERY } from '../constants/ApiConstants';
import { handleFormChange } from '../utils/helperMethods';

/**
 * @function withSearch - This is a higher order component that accepts a component
 * (which is either the Home/Results page) and wraps it with the common logic
 * for changing form values and searching.
 *
 * https://reactjs.org/docs/higher-order-components.html
 *
 * @param {Object} Content - The child react component
 */
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
      this.props.dispatch(setToHighlight(businessName));

      // Check that there are some values in the form
      if (Object.keys(formValues).length === 0 && formValues.constructor === Object) {
        this.props.dispatch(resetResults());
        this.setState({
          ...this.state,
          showError: true,
          errorMessage: 'You cannot submit an empty query.',
        });
      } else {
        this.props.dispatch(search(formValues, true));
      }
    }
    onChange = (evt) => {
      const { value, id } = evt.target;
      const formValues = handleFormChange(this.state.formValues, id, value);
      this.setState({ ...this.state, formValues });
      this.props.dispatch(setQuery(SET_QUERY, formValues));
    }
    onClear = () => {
      this.props.dispatch(setQuery(SET_QUERY, {}));
      this.setState({ ...this.state, formValues: {} });
    }
    closeModal = () => this.setState({ ...this.state, showError: false, errorMessage: '' });
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
    currentlySending: state.apiSearch.currentlySending,
    query: state.apiSearch.query,
    results: state.apiSearch.results,
    errorMessage: state.apiSearch.errorMessage,
    toHighlight: state.apiSearch.toHighlight,
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
