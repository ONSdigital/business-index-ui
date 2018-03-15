'use strict';

require('dotenv').config(); // Get env vars from the .env file

const express = require('express');
const fork = require('child_process').fork;
const logger = require('./utilities/logger')(module);
const compression = require('compression');
const morgan = require('morgan');
const myParser = require('body-parser');
const path = require('path');
const JsonSession = require('./sessions/JsonSession');
const RedisSession = require('./sessions/RedisSession');
const PsqlSession = require('./sessions/PsqlSession');

// Environment Variables
const SERVE_HTML = (process.env.SERVE_HTML === 'true'); // To server the React /build
const PORT = process.env.PORT || 3001;
const LOG_LEVEL = (process.env.NODE_ENV === 'production') ? 'info' : 'debug';
const SESSION_DB = process.env.SESSION_DB || 'json';
const ENV = process.env.NODE_ENV;

// On a local environment, we mock the API Gateway with a node script on localhost:3002
const child = (ENV === 'development') ? fork('./server/apiGateway') : null;

logger.level = LOG_LEVEL;
logger.info('Started Winston logger & created log file');
logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
logger.info(`LOG_LEVEL: ${LOG_LEVEL}`);

// Choose which session type to use
const session = ((db) => {
  switch (db) {
    case 'json':
      logger.debug('Creating new JsonSession');
      return new JsonSession('json');
    case 'redis':
      logger.debug('Creating new RedisSession');
      return new RedisSession('redis');
    case 'psql':
      logger.debug('Creating new PsqlSession');
      return new PsqlSession('psql');
    default:
      logger.debug('Creating new JsonSession');
      return new JsonSession('json');
  }
})(SESSION_DB);
logger.info(`Using session type: ${session.name}`);

// https://stackoverflow.com/questions/10090414/express-how-to-pass-app-instance-to-routes-from-a-different-file
const app = module.exports = express();

// Attach the cache function to the app
app.cache = require('./utilities/cache');

// Gzip all responses
app.use(compression());

// Logging configuration
morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms');
app.use(morgan('combined', { stream: logger.stream })); // Send Morgan logs to Winston

// For parsing the body of POSTs
app.use(myParser.json());

// Serve static assets (static js files for React from 'npm run build')
if (SERVE_HTML) {
  logger.info('Serving static html in build dir');
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
}

// Below is for CORS, CORS is only needed when React/Node are on different ports
// e.g. when testing locally and React is on 3000 and Node is on 3001
if (ENV === 'development') {
  logger.info('Using Access-Control-Allow-Origin CORS headers');
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
    next();
  });
}

// Attach the session class to the app
app.session = session;
app.env = ENV;

// Routes
app.use(require('./routes/auth'));
app.use(require('./routes/api'));
if (SERVE_HTML) app.use(require('./routes/staticFiles'));

app.listen(PORT, () => {
  logger.info(`bi-ui-node-server listening on port ${PORT}!`);
});

// Cleanup Code - for before the application exits
process.stdin.resume(); // so the program will not close instantly

function exitHandler(options, err) {
  if (options.cleanup) {
    if (process.env.ENV === 'local') {
      logger.info('Killing child process (bi-ui-mock-api-gateway)...');
      child.kill('SIGINT');
    }
  }
  if (err) logger.error(err.stack);
  if (options.exit) process.exit();
}

// Do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

// Catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// Catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

// Catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
