'use strict';

/* eslint strict: "off" */
/* eslint no-console: "off" */

const fork = require('child_process').fork;
const app = require('./app');
const logger = require('./logger');

const PORT = process.env.PORT || 3001;

// On a local environment, we mock the API Gateway with the a node script on localhost:3002
const child = (process.env.ENV === 'local') ? fork('./server/apiGateway') : null;

logger.level = 'debug';
logger.info('Started Winston logger & created log file');

app.maxSockets = 500;
app.listen(PORT, () => {
  logger.info(`bi-ui-node-server listening on port ${PORT}!`);
});

// Cleanup Code - for before the application exits
process.stdin.resume(); // so the program will not close instantly

function exitHandler(options, err) {
  if (options.cleanup) {
    if (process.env.ENV === 'local') {
      console.log('Killing child process (bi-ui-mock-api-gateway)...');
      logger.info('Killing child process (bi-ui-mock-api-gateway)...');
      child.kill('SIGINT');
    }
  }
  if (err) console.log(err.stack);
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
