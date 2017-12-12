'use strict';

const app = require('../index');
const express = require('express');
const rp = require('request-promise');
const uuidv4 = require('uuid/v4');
const logger = require('../utilities/logger')(module);
const urls = require('../config/urls');
const timeouts = require('../config/timeouts');

const router = express.Router();

const createSessionMiddleware = (req, res) => {
  app.session.createSession(req.username, req.connection.remoteAddress, req.role, req.key)
  .then((sessionJson) => {
    logger.info('Successful login');
    res.send(JSON.stringify({
      accessToken: sessionJson.accessToken,
      username: req.body.username,
      role: req.role,
      showConfetti: req.showConfetti,
    })).end();
  })
  .catch((error) => {
    logger.error(`Login 500 server error: ${error}`);
    res.sendStatus(500).end();
  });
};

const loginMiddleware = (req, res, next) => {
  const username = req.body.username;
  const basicAuth = req.get('Authorization');

  let options = {
    method: 'POST',
    uri: urls.AUTH_URL,
    timeout: timeouts.API_GW,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${basicAuth}`,
    },
    json: true,
    body: { username },
  };
  if (app.ENV === 'prod') {
    options = {
      method: 'POST',
      uri: urls.AUTH_URL,
      timeout: timeouts.API_GW,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': `${basicAuth}`,
      },
      json: true,
    };
  }

  rp(options)
  .then((gatewayJson) => {
    // Create user session
    const accessToken = uuidv4();
    // We get the showConfetti env var on every login, as it can dynamically change in CF
    const showConfetti = (process.env.SHOW_CONFETTI === 'true');

    // Attach variables to the request for later use
    req.showConfetti = showConfetti;
    req.role = gatewayJson.role;
    req.key = gatewayJson.key;
    req.accessToken = accessToken;
    req.username = username;

    logger.info('Successful login');
    next();
  })
  .catch((err) => {
    logger.error(`Unable to login, timeout or server error: ${err}`);
    if (err.statusCode) return res.sendStatus(err.statusCode).end();
    return res.sendStatus(504).end(); // Timeout
  });
};

const checkTokenMiddleware = (req, res) => {
  logger.info('Checking token');
  const accessToken = req.get('Authorization');

  app.session.getSession(accessToken)
  .then((json) => {
    logger.info('Valid token');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      username: json.username,
      role: json.role,
      accessToken,
    })).end();
  })
  .catch(() => {
    logger.info('Invalid token');
    res.sendStatus(401).end();
  });
};

const logoutMiddleware = (req, res) => {
  logger.info('Logging user out');
  const accessToken = req.get('Authorization');

  app.session.killSession(accessToken)
  .then(() => {
    logger.info('Successful user log out');
    res.sendStatus(200).end();
  })
  .catch((err) => {
    logger.info(`Unable to log user out: ${err}`);
    res.sendStatus(401).end();
  });
};

router.post('/auth/login', [loginMiddleware, createSessionMiddleware]);
router.post('/auth/checkToken', [checkTokenMiddleware]);
router.post('/auth/logout', [logoutMiddleware]);

module.exports = router;
