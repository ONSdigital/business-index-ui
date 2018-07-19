const winston = require('winston');
const fs = require('fs');

// Logging Setup
const tsFormat = () => (new Date()).toLocaleTimeString();
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = (module) => {
  const path = module.filename.split('/').slice(-2).join('/');

  const winstonLogger = new (winston.Logger)({
    transports: [
      // Colorize the output to the console
      new (winston.transports.Console)({
        timestamp: tsFormat,
        colorize: true,
        label: path,
      }),
      new (winston.transports.File)({
        filename: `${logDir}/bi-ui-node-server-logs.log`,
        timestamp: tsFormat,
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
        label: path,
      }),
    ],
  });

  // Morgan appends an extra \n, so we need to remove it
  winstonLogger.stream = {
    write: (message, encoding) => {
      winstonLogger.info(message.substring(0, message.lastIndexOf('\n')));
    },
  };

  return winstonLogger;
};

module.exports = logger;
