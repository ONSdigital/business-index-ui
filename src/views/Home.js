import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../patterns/Panel';
import ErrorModal from '../components/ErrorModal';
import SearchForm from '../components/SearchForm';

/**
 * @const Home - The Home component will be used with SearchHOC, which provides the
 * props required for searching and updating the form. On a successful search, the
 * user is redirected to /Results in ApiActions. A functional component is used
 * instead of a React class as we don't use refs (unlike the Results page).
 */
const Home = (props) => (
  <section>
    <div className="main-content">
      <div className="wrapper">
        <div className="group">
          <div className="col-8">
            <h2 id="homeTitle" className="saturn">Search the UK business population</h2>
            <Panel
              id="tipPanel"
              text="To get started, search using one or more of the options below."
              level="info"
            />
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="group">
          <div className="col-6">
            <SearchForm
              className="form"
              size="s"
              currentlySending={props.currentlySending}
              initialValues={props.query}
              onSubmit={props.onSubmit}
              onChange={props.onChange}
              onClear={props.onClear}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
    <ErrorModal show={props.showError} message={props.errorMessage} close={props.closeModal} />
  </section>
);

Home.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  query: PropTypes.object.isRequired,
  showError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Home;
