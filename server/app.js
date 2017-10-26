'use strict';

// Rule exceptions:
/* eslint strict: "off" */
/* eslint comma-dangle: ["error", "never"] */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const uuidv4 = require('uuid/v4');
const myParser = require('body-parser');
const urls = require('./config/urls');
const timeouts = require('./config/timeouts');
const version = require('./package.json').version;
const rp = require('request-promise');
const compression = require('compression');
const cache = require('./helpers/cache');
const formatDate = require('./helpers/formatDate.js');
const logger = require('./logger');

// To allow hot-reloading, the node server only serves the React.js index.html
// in the /build file if SERVE_HTML is true
const ENV = process.env.ENV;
const SERVE_HTML = (process.env.SERVE_HTML === 'true');

logger.info(`ENV: ${ENV}`);
logger.info(`SERVE_HTML: ${SERVE_HTML}`);

const sessions = {}; // For the user sessions
const startTime = formatDate(new Date());

const app = express();

app.use(compression()); // gzip all responses
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(myParser.json()); // For parsing body of POSTs

// Serve static assets (static js files for React from 'npm run build')
if (SERVE_HTML) {
  logger.info('Serving static html in build dir');
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
}

// Below is for CORS, CORS is only needed when React/Node are on different ports
// e.g. when testing locally and React is on 3000 and Node is on 3001
if (ENV === 'local') {
  logger.info('Using Access-Control-Allow-Origin CORS headers');
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
}

// This method needs to be above the serve React code
// If it's below, the get('*') will point all GETs to the React
app.get('/info', cache(), (req, res) => {
  logger.info('Returning /info');
  res.send(JSON.stringify({
    version,
    lastUpdate: startTime
  }));
});

// Always return the main index.html, so react-router renders the route in the client
if (SERVE_HTML) {
  logger.info('Serving /build dir static files');
  app.get('*', cache(), (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

app.post('/login', (req, res) => {
  logger.info('Logging user in');
  // Get the username from the body of the POST
  const username = req.body.username;

  const basicAuth = req.get('Authorization');
  let options = {
    method: 'POST',
    uri: urls.AUTH_URL,
    timeout: timeouts.API_GW,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${basicAuth}`
    },
    json: true,
    body: { username }
  };
  if (ENV === 'prod') {
    options = {
      method: 'POST',
      uri: urls.AUTH_URL,
      timeout: timeouts.API_GW,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: `${basicAuth}`
      }
    };
  }

  rp(options)
    .then((gatewayJson) => {
      // Create user session
      const accessToken = uuidv4();
      sessions[accessToken] = {
        key: gatewayJson.key,
        role: gatewayJson.role,
        username
      };

      logger.info('Successful login');
      res.setHeader('Content-Type', 'application/json');
      return res.send(JSON.stringify({
        username,
        accessToken,
        role: gatewayJson.role
      }));
    })
    .catch((err) => {
      logger.error('Unable to login, timeout or server error');
      if (err.statusCode) return res.sendStatus(err.statusCode);
      return res.sendStatus(504); // Timeout
    });
});

app.post('/checkToken', (req, res) => {
  logger.info('Checking token');
  const accessToken = req.body.accessToken;

  if (sessions[accessToken]) {
    logger.info('Valid token');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ username: sessions[accessToken].username, accessToken }));
  } else {
    logger.info('Invalid token');
    res.sendStatus(401);
  }
});

app.post('/logout', (req, res) => {
  const token = req.body.token;
  // Remove user from storage
  delete sessions[token];
  logger.info('Logging user out');
  res.sendStatus(200);
});

app.post('/api', (req, res) => {
  // re route api requests with API key
  const method = req.body.method;
  const endpoint = req.body.endpoint;
  const accessToken = req.get('Authorization');

  if (sessions[accessToken]) {
    const key = sessions[accessToken].key;
    if (method === 'GET') {
      getApiEndpoint(`${urls.API_GW}/bi/${endpoint}`, key)
        .then((response) => {
          logger.info('Returning GET response from API Gateway');
          return res.send(response);
        })
        .catch((err) => {
          logger.info('Error in API Gateway for GET request');
          return res.status(err.statusCode).send(err);
        });
    } else if (method === 'POST') {
      const postBody = req.body.postBody;
      postApiEndpoint(`${urls.API_GW}/bi/${endpoint}`, postBody, key)
        .then((response) => {
          logger.info('Returning POST response from API Gateway');
          return res.send(response);
        })
        .catch((err) => {
          logger.info('Error in API Gateway for POST request');
          return res.status(err.statusCode).send(err);
        });
    }
  } else {
    logger.info('Unable to use /api endpoint, not authenticated');
    return res.sendStatus(401);
  }
});

function getApiEndpoint(url, apiKey) {
  logger.debug(`GET API endpoint for url: ${url}`);
  const options = {
    method: 'GET',
    headers: {
      'Authorization': apiKey
    },
    uri: url,
    timeout: timeouts.API_GET
  };

  return rp(options);
}

function postApiEndpoint(url, postBody, apiKey) {
  logger.debug(`POST API endpoint for url: ${url}`);
  const options = {
    method: 'POST',
    uri: url,
    timeout: timeouts.API_POST,
    headers: {
      'Authorization': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postBody), // '{"updatedBy":"name","vars":{"ent_name":"name"}}',
    json: false
  };

  return rp(options);
}

module.exports = app;
