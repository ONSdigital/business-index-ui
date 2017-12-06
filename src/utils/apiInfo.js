// @flow

import config from '../config/api-urls';

const { AUTH_URL, REROUTE_URL, API_VERSION } = config;

/**
 * API lib for getting info (version/last updated etc.)
 * @type {Object}
 */
const apiInfo = {
  /**
   * Gets version/lastUpdate info from the UI.
   * @param  {Function} callback Called with returned data.
   */
  getUiInfo(callback: (success: boolean, data: {}) => void) {
    fetch(`${AUTH_URL}/api/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.accessToken,
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          const version: string = json.version;
          const lastUpdate: string = json.lastUpdate;
          callback(true, { version, lastUpdate });
        });
      }
      return callback(false, { message: 'Server error: unable to load data.' });
    }).catch(() => {
      return callback(false, { message: 'Timeout: unable to load data' });
    });
  },
  /**
   * Gets version/lastUpdate info from the API.
   * @param  {Function} callback Called with returned data.
   */
  getApiInfo(callback: (success: boolean, data: {}) => void) {
    fetch(`${REROUTE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        method: 'GET',
        endpoint: 'version',
      }),
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          const version: string = json.version;
          const lastApiUpdate: string = json.builtAtString;
          const lastDataUpdate: string = json.lastDataUpdate;
          callback(true, { version, lastApiUpdate, lastDataUpdate });
        });
      }
      return callback(false, { message: 'Server error: unable to load data.' });
    }).catch(() => {
      return callback(false, { message: 'Timeout: unable to load data' });
    });
  },
};

module.exports = apiInfo;
