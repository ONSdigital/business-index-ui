import {} from 'dotenv/config'; // Get env vars from the .env file

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

ReactDOM.render(
  <Routes />,
  document.getElementById('root'),
);
