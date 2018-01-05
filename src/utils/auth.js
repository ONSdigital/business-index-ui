import config from '../config/api-urls';

const { AUTH_URL } = config;

/**
 * Authentication lib
 * @type {Object}
 */
const auth = {
  /**
   * Logs a user in
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was logged in on the remote server
   */
  login(username, basicAuth, callback) {
    // Do not need to check if user is already logged in, this is done in
    // routes.js before this method is called

    // POST to the backend with username/password
    fetch(`${AUTH_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({ username }),
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          // const token: string = json.jToken;
          const loginName = json.username;
          const accessToken = json.accessToken;
          const showConfetti = json.showConfetti;
          const role = json.role;
          // Send auth request to save token username pair
          callback(true, { username: loginName, accessToken, showConfetti, role });
        });
      }
      return callback(false, { message: 'Unable to login.' });
    })
    .catch(() => {
      return callback(false, { message: 'Server error: request timed out.' });
    });
  },
  checkToken(accessToken, callback) {
    fetch(`${AUTH_URL}/auth/checkToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.accessToken,
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          const newAccessToken = json.accessToken;
          const username = json.username;
          const role = json.role;
          // Send auth request to save token username pair
          callback(true, { username, newAccessToken, role });
        });
      }
      return callback(false);
    })
    .catch(() => {
      return callback(false, { message: 'Server error: request timed out.' });
    });
  },
  /**
   * Logs the current user out
   */
  logout(accessToken, callback) {
    // const token: string = sessionStorage.token;
    fetch(`${AUTH_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.accessToken,
      },
    }).then(() => {
      // Whatever the response, log the user out.
      sessionStorage.clear();
      callback(true);
    });
  },
  onChange() {},
};

module.exports = auth;
