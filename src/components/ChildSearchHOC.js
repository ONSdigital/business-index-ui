import React from 'react';
import PropTypes from 'prop-types';
import config from '../config/api-urls';
import accessAPI from '../utils/accessAPI';

const { REROUTE_URL, API_VERSION, BUSINESS_ENDPOINT } = config;

/**
 * @function withChildSearch - This is a higher order component that accepts a component
 * (which is either the ChildRefTable or ChildRefList page) and wraps it with the common logic
 * for getting child ref data from the API.
 *
 * https://reactjs.org/docs/higher-order-components.html
 *
 * @param {Object} Content - The child react component
 */
export default function withChildSearch(Content) {
  class ChildSearchHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        finishedLoading: false,
        isLoading: false,
        data: {},
        error: false,
        errorMessage: '',
      };
    }
    toggle = () => this.setState({ finishedLoading: false });
    fetchData = () => {
      if (this.state.finishedLoading) {
        this.setState({ finishedLoading: false });
      } else {
        const id = this.props.id;
        this.setState({ ...this.state, isLoading: true }, () => {
          accessAPI(REROUTE_URL, 'POST', sessionStorage.accessToken, JSON.stringify({
            method: 'GET',
            endpoint: `${API_VERSION}/${BUSINESS_ENDPOINT}/${id}`,
          }), 'business').then(response => response.json())
          .then(json => this.setState({ ...this.state, data: json, finishedLoading: true, isLoading: false }))
          .catch(() => {
            const errorMessage = 'Error: Unable to get child references.';
            this.setState({ ...this.state, errorMessage, error: true, finishedLoading: true, isLoading: false });
          });
        });
      }
    }
    createChLink = (id) => (<a target="_blank" rel="noopener noreferrer" href={`http://data.companieshouse.gov.uk/doc/company/${id}`}>{id}</a>);
    closeModal = () => this.setState({ ...this.state, error: false, errorMessage: '' });
    render = () => (
      <div>
        <Content
          fetchData={this.fetchData}
          errorMessage={this.state.errorMessage}
          closeModal={this.closeModal}
          error={this.state.error}
          finishedLoading={this.state.finishedLoading}
          isLoading={this.state.isLoading}
          data={this.state.data}
          createChLink={this.createChLink}
        />
      </div>
    )
  }

  ChildSearchHOC.propTypes = {
    id: PropTypes.number.isRequired,
  };

  return ChildSearchHOC;
}
