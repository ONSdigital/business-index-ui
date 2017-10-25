// @flow

import config from '../config/api-urls';

const { API_URL, API_VERSION, SEARCH_ENDPOINT } = config;

/**
 * API lib for searching business-index-api
 * @type {Object}
 */
const apiSearch = {
  /**
   * Searches API for match
   * @param  {Function} callback Called with returned data.
   */
  match(query: string, callback: (success: boolean, data: {}, response?: {}) => void) {
    fetch(`${API_URL}/${API_VERSION}/${SEARCH_ENDPOINT}${query}`, {
      method: 'GET',
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
    /**
   * Searches API for range
   * @param  {Function} callback Called with returned data.
   */
  range(query: string, callback: (success: boolean, data: {}, response?: {}) => void) {
    fetch(`${API_URL}/${API_VERSION}/search?${query}`, {
      method: 'GET',
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
    /**
   * Searches API for exact match
   * @param  {Function} callback Called with returned data.
   */
  ubrn(id: string, callback: (success: boolean, data: {}, response?: {}) => void) {
    fetch(`${API_URL}/${API_VERSION}/business/${id}`, {
      method: 'GET',
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
