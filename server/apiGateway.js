'use strict';

/* eslint strict: "off" */
/* eslint no-console: "off" */
/* eslint comma-dangle: ["error", "never"] */

const express = require('express');
const morgan = require('morgan');
const myParser = require('body-parser');
const base64 = require('base-64');
const compression = require('compression');
const rp = require('request-promise');
const timeouts = require('./config/timeouts');
const urls = require('./config/urls');
const uuidv4 = require('uuid/v4');
const logger = require('./utilities/logger')(module);

const PORT = process.env.PORT || 3002;

// Get the admin/user credentials from environment variables
const ADMIN_USERNAME = process.env.BI_UI_TEST_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.BI_UI_TEST_ADMIN_PASSWORD;
const USER_USERNAME = process.env.BI_UI_TEST_USER_USERNAME;
const USER_PASSWORD = process.env.BI_UI_TEST_USER_PASSWORD;

// We use the users JSON as a mock database holding { username: hashed_password }
const users = {};
users[ADMIN_USERNAME] = `Basic ${base64.encode(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`)}`;
users[USER_USERNAME] = `Basic ${base64.encode(`${USER_USERNAME}:${USER_PASSWORD}`)}`;

// We need to store all the valid API keys that uuidv4() has made
const validApiKeys = {};

const app = express();
app.use(compression()); // gzip all responses
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(myParser.json()); // For parsing body of POSTs

app.post('/auth', (req, res) => {
  logger.info('Checking /auth');
  const username = req.body.username;
  const basicAuth = req.get('Authorization');

  // If the provided basic authentication matches any of our own base64 encoded
  // Authorization keys in the users JSON
  if (users[username] === basicAuth) {
    logger.info('Creating API Key for user');
    const key = uuidv4();
    validApiKeys[key] = basicAuth;
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify({
      key,
      role: 'admin'
    }));
  }
  return res.sendStatus(401);
});

app.get('/bi/*', (req, res) => {
  const url = getUrlEndpoint(req.originalUrl);
  logger.info(`Rerouting GET API request to ${url}`);

  // Check if the API Key is valid
  const apiKey = req.get('Authorization');
  if (validApiKey(apiKey)) {
    getApiEndpoint(`${urls.API_URL}${url}`)
    .then((response) => {
      logger.info('Returning re-routed GET API request');
      return res.send(response);
    })
    .catch((error) => {
      logger.error('Error rerouting GET request');
      return res.status(error.statusCode).send(error);
    });
  } else {
    return res.sendStatus(401);
  }
});

app.post('/bi/*', (req, res) => {
  const url = getUrlEndpoint(req.originalUrl);
  logger.info(`Rerouting POST API request to ${url}`);

  // Check if the API Key is valid
  const apiKey = req.get('Authorization');
  if (validApiKey(apiKey)) {
    const postBody = req.body;
    postApiEndpoint(`${urls.API_URL}${url}`, postBody)
      .then((response) => {
        logger.info('Returning re-routed POST API request');
        return res.send(response);
      })
      .catch((error) => {
        logger.error('Error rerouting POST request');
        return res.status(error.statusCode).send(error);
      });
  } else {
    return res.sendStatus(401);
  }
});

function validApiKey(apiKey) {
  return validApiKeys[apiKey];
}

function getUrlEndpoint(url) {
  return url.substring(url.indexOf('/', 1), url.length);
}

function getApiEndpoint(url) {
  logger.debug(`GET API endpoint for ${url}`);
  const options = {
    method: 'GET',
    uri: url,
    timeout: timeouts.API_GET
  };

  return rp(options);
}

function postApiEndpoint(url, postBody) {
  logger.debug(`POST API endpoint for ${url}`);
  const options = {
    method: 'POST',
    uri: url,
    timeout: timeouts.API_POST,
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(postBody), // '{"updatedBy":"name","vars":{"ent_name":"name"}}',
    json: false
  };

  return rp(options);
}

app.listen(PORT, () => {
  logger.info(`bi-ui-mock-api-gateway listening on port ${PORT}!`);
});
