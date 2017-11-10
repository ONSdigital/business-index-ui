import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import NavBar from './NavBar';
import Banner from './Banner';
import Footer from './Footer';
import ShowConfetti from '../components/Confetti';
import config from '../config/constants';

const { ENV } = config;

const Template = (props) => {
  const onProdEnv = (ENV === 'prod');
  const banner = (onProdEnv) ? '' : (<Banner />);
  if (props.location.pathname === '/' || props.location.pathname === 'Login') {
    return (
      <div>
        {banner}
        <div className="container">
          <Header />
          {props.children}
        </div>
      </div>
    );
  }
  return (
    <div>
      <ShowConfetti seconds={config.SHOW_CONFETTI_TIME} />
      {banner}
      <Header />
      <NavBar primary={props.location.pathname} />
      <div className="container">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

Template.propTypes = {
  location: React.PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.object.isRequired,
};

export default Template;
