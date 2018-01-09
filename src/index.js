import {} from 'dotenv/config'; // Get env vars from the .env file

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Routes from './routes';
import './resources/css/index.css';
import './resources/css/sdc-isolation.css';

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root'),
);
