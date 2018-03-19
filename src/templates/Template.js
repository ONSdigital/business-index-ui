import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import ShowConfetti from '../components/Confetti';
import config from '../config/constants';

const Template = (props) => {
  return (
    <div>
      <ShowConfetti seconds={config.SHOW_CONFETTI_TIME} />
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

Template.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default Template;
