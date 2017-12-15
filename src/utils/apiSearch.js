// @flow

import config from '../config/api-urls';

const { REROUTE_URL, API_VERSION } = config;

/**
 * API lib for searching business-index-api
 * @type {Object}
 */
const apiSearch = {
  /**
   * Searches API for match
   * @param  {Function} callback Called with returned data.
   */
  search(query: string, callback: (success: boolean, data: {}, response?: {}) => void) {
    // fetch(`${REROUTE_URL}/${API_VERSION}/${SEARCH_ENDPOINT}${query}`, {
    //   method: 'GET',
    fetch(`${REROUTE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        method: 'GET',
        endpoint: `${API_VERSION}/${query}`,
      }),
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          callback(true, { results: json, response: response.headers, resp: response });
        });
      } else if (response.status >= 500 && response.status < 600) {
        return callback(false, { message: 'Server error: unable to load data.', resp: response });
      }
      return callback(false, { message: 'Error: record not found.', resp: response });
    }).catch(() => {
      return callback(false, { message: 'Timeout: unable to load data.' });
    });
  },
};

module.exports = apiSearch;
