'use strict';

const app = require('../index');
const express = require('express');
const logger = require('../utilities/logger')(module);
const formatDate = require('../utilities/formatDate');
const version = require('../package.json').version;
const urls = require('../config/urls');
const timeouts = require('../config/timeouts');
const rp = require('request-promise');

const router = express.Router();

const startTime = formatDate(new Date());

const authMiddleware = function (req, res, next) {
  // This middleware will be used in every /api/ method to
  // validate the user provided accessToken
  const accessToken = req.get('Authorization');

  app.session.getSession(accessToken)
  .then((json) => {
    logger.info('Valid token');
    req.username = json.username;
    req.apiKey = json.apiKey;
    next();
  })
  .catch(() => {
    logger.info('Invalid token');
    res.sendStatus(401).end();
  });
};

router.get('/api/info', authMiddleware, (req, res) => {
  logger.info('Returning /info');
  res.send(JSON.stringify({
    version,
    lastUpdate: startTime,
  }));
});

router.post('/api', authMiddleware, (req, res) => {
  // re route api requests with API key
  const method = req.body.method;
  const endpoint = req.body.endpoint;

  const key = req.apiKey;
  if (method === 'GET') {
    getApiEndpoint(`${urls.API_GW}/bi/${endpoint}`, key)
      .then((response) => {
        logger.info('Returning GET response from API Gateway');
        return res.send(response);
      })
      .catch((err) => {
        logger.info('Error in API Gateway for GET request');
        return res.sendStatus(err.statusCode);
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
        return res.sendStatus(err.statusCode);
      });
  }
});

function getApiEndpoint(url, apiKey) {
  logger.debug(`GET API endpoint for url: ${url}`);
  const options = {
    method: 'GET',
    headers: {
      'Authorization': apiKey,
    },
    uri: url,
    timeout: timeouts.API_GET,
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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
    json: false,
  };

  return rp(options);
}

module.exports = router;
