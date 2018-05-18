import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import history from '../history';
import { checkAuth } from '../actions/LoginActions';
import Header from './Header';
import Footer from './Footer';
import ShowConfetti from '../components/Confetti';
import config from '../config/constants';

const { SHOW_CONFETTI_TIME } = config;

/**
 * @const Template - The default template for all pages
 */
class Template extends React.Component {
  componentDidMount = () => {
    if (sessionStorage.accessToken) {
      this.props.dispatch(checkAuth());
    } else {
      history.push('/');
    }
  }
  render = () => {
    // If we are not on the login page, we can show the 'confetti'
    const confettiComponent = <ShowConfetti seconds={SHOW_CONFETTI_TIME} />;
    const path = this.props.location.pathname;
    const confetti = (path === '/' || path === 'Login') ? null : confettiComponent;

    // The components that are included in the template component do not change between
    // logged in / not logged in states, we handle changes (i.e. not showing the sign
    // out button) in the underlying components
    return (
      <DocumentTitle title="Business Index - Home">
        <section>
          {confetti}
          <Header location={location} />
          {this.props.children}
          <Footer />
        </section>
      </DocumentTitle>
    );
  };
}

Template.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect()(Template));
