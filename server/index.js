'use strict';

// Rule exceptions:
/* eslint strict: "off" */
/* eslint no-console: "off" */

const app = require('./app');
const logger = require('./logger');

const PORT = process.env.PORT || 3001;

logger.level = 'debug';
logger.info('Started Winston logger & created log file');

app.maxSockets = 500;
app.listen(PORT, () => {
  logger.info(`bi-ui-node-server listening on port ${PORT}!`);
});
