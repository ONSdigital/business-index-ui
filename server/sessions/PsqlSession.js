const Session = require('./Session');
const logger = require('../utilities/logger')(module);
const Pool = require('pg').Pool;
const uuidv4 = require('uuid/v4');

logger.info('Creating new PostgreSQL pool');
const pool = new Pool();

// Useful documentation:
// https://gist.github.com/brianc/f906bacc17409203aee0
// https://stackoverflow.com/questions/8484404/what-is-the-proper-way-to-use-the-node-js-postgresql-module
// https://node-postgres.com/api/client

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

class PsqlSession extends Session {
  constructor(name) {
    super(name);
    this.tableName = 'sbr_sessions_dev';
  }

  createSession(username, remoteAddress, key, role) {
    logger.info('Creating new PostgreSQL session');

    return new Promise((resolve, reject) => {
      const accessToken = uuidv4();

      const query = `
        INSERT INTO ${this.tableName}
        (accessToken, username, role, remoteAddress, apiKey)
        VALUES ('${accessToken}', '${username}', '${role}', '${remoteAddress}', '${key}');
      `;

      pool.connect()
      .then(client => {
        return client.query(query)
          .then(res => {
            client.release();
            if (res.rowCount === 1) {
              logger.info('Create PostgreSQL session was successful');
              resolve({ accessToken, role });
            } else {
              logger.error('Unable to create PostgreSQL session');
              reject({ error: 'Unable to create PostgreSQL session' });
            }
          })
          .catch(error => {
            client.release();
            logger.error(`Create PostgreSQL session error: ${error}`);
            reject({ error });
          });
      });
    });
  }

  getApiKey(accessToken) {
    logger.info('Getting apiKey from PostgreSQL session');

    return new Promise((resolve, reject) => {
      const query = `
        UPDATE ${this.tableName}
        SET sessionExpire=now() + INTERVAL '8 hours'
        FROM (SELECT username, apiKey FROM ${this.tableName}) AS subquery
        WHERE accessToken='${accessToken}'
        RETURNING subquery.username, subquery.apiKey
      `;

      pool.connect()
      .then(client => {
        return client.query(query)
          .then(res => {
            client.release();
            if (res.rowCount === 1) {
              logger.info('Get API Key from PostgreSQL session was successful');
              resolve({ username: res.rows[0].username, accessToken, apiKey: res.rows[0].apikey });
            } else {
              logger.error('Unable to get API key from PostgreSQL session');
              reject({ error: 'Unable to get API key from PostgreSQL session' });
            }
          })
          .catch(error => {
            client.release();
            logger.error(`Get API Key from PostgreSQL session error: ${error}`);
            reject({ error });
          });
      });
    });
  }

  getSession(accessToken) {
    logger.info('Getting PostgreSQL session');

    return new Promise((resolve, reject) => {
      const query = `
        UPDATE ${this.tableName}
        SET sessionExpire=now() + INTERVAL '8 hours'
        FROM (SELECT username FROM ${this.tableName}) AS subquery
        WHERE accessToken='${accessToken}'
        RETURNING subquery.username
      `;

      pool.connect()
      .then(client => {
        return client.query(query)
          .then(res => {
            client.release();
            if (res.rowCount === 1) {
              logger.info('Get PostgreSQL session was successful');
              resolve({ username: res.rows[0].username, accessToken });
            } else {
              logger.error('Unable to get PostgreSQL session');
              reject({ error: 'Unable to get PostgreSQL session' });
            }
          })
          .catch(error => {
            client.release();
            logger.error(`Get PostgreSQL session error: ${error}`);
            reject({ error });
          });
      });
    });
  }

  killSession(accessToken) {
    logger.info('Killing PostgreSQL session');

    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM ${this.tableName} 
        WHERE accessToken='${accessToken}'
      `;

      pool.connect()
      .then(client => {
        return client.query(query)
          .then(res => {
            client.release();
            if (res.rowCount === 1) {
              logger.info('PostgreSQL session was successfully killed');
              resolve();
            } else {
              logger.error('Unable to kill PostgreSQL session');
              reject({ error: 'Unable to kill PostgreSQL session' });
            }
          })
          .catch(error => {
            client.release();
            logger.error(`Kill PostgreSQL session error: ${error}`);
            reject({ error });
          });
      });
    });
  }
}

module.exports = PsqlSession;
