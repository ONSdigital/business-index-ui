import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import ShowConfetti from '../components/Confetti';
import config from '../config/constants';

const { SHOW_CONFETTI_TIME } = config;

/**
 * @const Template - The default template for all pages
 */
const Template = ({ location, children }) => {
  // If we are not on the login page, we can show the 'confetti'
  const confettiComponent = <ShowConfetti seconds={SHOW_CONFETTI_TIME} />;
  const path = location.pathname;
  const confetti = (path === '/' || path === 'Login') ? null : confettiComponent;

  // The components that are included in the template component do not change between
  // logged in / not logged in states, we handle changes (i.e. not showing the sign
  // out button) in the underlying components
  return (
    <section>
      {confetti}
      <Header location={location} />
      <section>
        {children}
      </section>
      <Footer />
    </section>
  );
};

Template.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default Template;
