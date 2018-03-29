import request from './request';

/**
 *
 * @const accessAPI - This encapsulates common fetch parameters
 *
 * @param {String} url - URL to fetch from
 * @param {String} method - The HTTP method
 * @param {String} auth - Either basic authentication or the accessToken
 * @param {String} body - The request body (as a JSON string)
 * @param {String} requestType - The request type (search/login/logout etc, used for mock requests)
 *
 * @return {Promise} - A fetch promise
 */
const accessAPI = (url, method, auth, body, requestType) => {
  return new Promise((resolve, reject) => {
    request(url, {
      requestType, // This isn't used in fetch, but is used in the mock fetch
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body,
    }).then((response) => {
      // We don't need to return the promise below, but it gets rid of an ESLint error
      // relating to not using a 'break' after each case
      // response.headers.append('X-Total-Count', '100');

      // Below is a small workaround for adding headers if we are using fake fetch
      if (process.env.REACT_APP_ENV === 'test') {
        response.headers = new Headers();
      }
      
      switch (response.status) {
        case 200: return resolve(response);
        case 400: return reject('Malformed query. Please review your input parameters.');
        case 404: return reject('Not found. Please review your input parameters.');
        case 401: return reject('Authentication problem. Please ensure you are logged in.');
        case 500: return reject('Server error. Please contact your system administrator.');
        default: return reject(`${response.status} error.`);
      }
    }).catch((err) => reject(`Server error: request timed out. ${err}`));
  });
};

export default accessAPI;
