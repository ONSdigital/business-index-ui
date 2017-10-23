const winston = require('winston');
const fs = require('fs');

// Logging Setup
const tsFormat = () => (new Date()).toLocaleTimeString();
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = new (winston.Logger)({
  transports: [
    // Colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    }),
    new (winston.transports.File)({
      filename: `${logDir}/bi-ui-node-server-logs.log`,
      timestamp: tsFormat,
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    }),
  ],
});

module.exports = logger;
