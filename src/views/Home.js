import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../patterns/Panel';
import ErrorModal from '../components/ErrorModal';
import SearchForm from '../components/SearchForm';

/**
 * @class Home
 */
class Home extends React.Component {
  render = () => {
    return (
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
                  size="s"
                  currentlySending={this.props.currentlySending}
                  initialValues={this.props.query}
                  onSubmit={this.props.onSubmit}
                  onChange={this.props.onChange}
                  onClear={this.props.onClear}
                  autoFocus
                  ref={(ch) => (this.newChild = ch)}
                />
              </div>
            </div>
          </div>
        </div>
        <ErrorModal show={this.props.showError} message={this.props.errorMessage} close={this.props.closeModal} />
      </section>
    );
  }
}

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
