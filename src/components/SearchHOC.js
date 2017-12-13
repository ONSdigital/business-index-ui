import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';
import ErrorModal from './ErrorModal';
import ResultsTable from './ResultsTable';

// The logic for the Match/Range/UBRN features are almost identical, so we
// use a higher order component to create the pages, including the common
// methods and state. Anything that isn't common can be passed in using
// the settings or actions/constants parameters.

// https://reactjs.org/docs/higher-order-components.html
export default function withSearch(Form, settings, actions, constants) {
  class SearchHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        errorMessage: '',
        formValues: {},
        showFilter: false,
        convertBands: true,
        scroll: false,
      };
      this.changeQuery = this.changeQuery.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.clearQuery = this.clearQuery.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.changeFilter = this.changeFilter.bind(this);
      this.changeBands = this.changeBands.bind(this);
    }
    componentDidMount() {
      // Reload the data from the store
      this.setState({ formValues: this.props.data.query });
    }
    componentWillReceiveProps(nextProps) {
      // The Redux action for the api request will set the errorMessage in the
      // store if the response is 4xx/5xx etc. Show this errorMessage in a modal,
      // props update on keypress so only show error if it has just appeared.
      if (nextProps.data.errorMessage !== '' && nextProps.data.errorMessage !== this.props.data.errorMessage) {
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
    componentDidUpdate() {
      // Scroll to the bottom of the page
      if (this.state.scroll && this.props.data.results.length > 0) {
        document.getElementById('react-table').scrollIntoView(false);
        this.setState({ scroll: false });
      }
    }
    onSubmit(e) {
      e.preventDefault();
      if (this.state.formValues !== {}) {
        this.setState({ showFilter: false });
        this.props.dispatch(actions.search(this.state.formValues));
      } else {
        // Possibly swap this action with a redux way of doing it?
        this.props.data.results = 0;
        this.setState({
          showFilter: false,
          show: true,
          errorMessage: 'Please enter a valid query',
        });
      }
    }
    focusAndScroll() {
      // Scroll to the top of the page and focus on the first input
      document.getElementsByClassName('wrapper')[0].scrollIntoView(false);
      this.child.childTextInput.myInput.focus();
    }
    closeModal() {
      this.setState({ show: false, errorMessage: '' });
      this.focusAndScroll();
    }
    clearQuery() {
      this.props.dispatch(actions.setQuery(constants.SET_QUERY, {}));
      this.props.dispatch(actions.setResults(constants.SET_RESULTS, { results: [] }));
      this.setState({ formValues: {}, showFilter: false });
      this.focusAndScroll();
    }
    changeFilter() {
      this.setState({ showFilter: !this.state.showFilter });
    }
    changeBands() {
      this.setState({ convertBands: !this.state.convertBands });
    }
    changeQuery(evt) {
      // if setting to empty, delete
      const formValues = this.state.formValues;
      if (evt.target.value === '' || evt.target.value[0] === '') {
        delete formValues[evt.target.id];
      } else {
        if (evt.target.id === 'BusinessName') {
          formValues[evt.target.id] = evt.target.value.toUpperCase();
        } else {
          formValues[evt.target.id] = evt.target.value;
        }
      }
      this.setState({ formValues });
      // Store the query in Redux store, so we can access it again if a user
      // presses 'back to search' on the Enterprise View page.
      this.props.dispatch(actions.setQuery(constants.SET_QUERY, formValues));
    }
    render() {
      const items = [
        { name: 'Home', link: '/Home' },
        { name: settings.title, link: '' },
      ];
      return (
        <div>
          <BreadCrumb breadCrumbItems={items} />
          <TitleAndDescription
            marginBottom="1"
            title={`${settings.title}`}
            description={settings.description}
          />
          <div className="page-intro background--gallery">
            <div className="wrapper">
              <Form
                ref={(ch) => (this.child = ch)}
                currentlySending={this.props.data.currentlySending}
                initialValues={this.props.data.query}
                onSubmit={this.onSubmit}
                onChange={this.changeQuery}
                onChangeFilter={this.changeFilter}
                onChangeBands={this.changeBands}
                filter={this.state.showFilter}
                onClear={this.clearQuery}
                showFilters={this.props.data.results.length !== 0}
                value={this.props.data.query}
                convertBands={this.state.convertBands}
              />
              <ErrorModal
                show={this.state.show}
                message={this.state.errorMessage}
                close={() => this.closeModal}
              />
              <br />
              {this.props.data.results.length !== 0 &&
                <ResultsTable
                  businessName={this.props.data.query.BusinessName}
                  convertBands={this.state.convertBands}
                  results={this.props.data.results}
                  showFilter={this.state.showFilter}
                  showPagination={settings.showPagination}
                  defaultPageSize={settings.defaultPageSize}
                />
              }
              <br />
            </div>
          </div>
        </div>
      );
    }
  }

  function select(state) {
    return {
      data: state.apiSearch[settings.storeName],
    };
  }

  SearchHOC.propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  return connect(select)(SearchHOC);
}
