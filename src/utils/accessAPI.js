/**
 *
 * @const accessAPI - This encapsulates common fetch parameters
 *
 * @param {String} url - URL to fetch from
 * @param {String} method - The HTTP method
 * @param {String} auth - Either basic authentication or the accessToken
 * @param {String} body - The request body (as a JSON string)
 * @param {Function} callback - The method to call with the fetch results
 *
 * @return {Function}
 *
 */
const accessAPI = (url, method, auth, body) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body,
    }).then((response) => {
      // We don't need to return the promise below, but it gets rid of an ESLint error
      // relating to not using a 'break' after each case
      switch (response.status) {
        case 200: return resolve(response.json());
        case 400: return reject('Malformed query. Please review your input parameters.');
        case 401: return reject('Authentication problem. Please ensure you are logged in.');
        case 500: return reject('Server error. Please contact your system administrator.');
        default: return reject(`${response.status} error.`);
      }
    }).catch((err) => reject(`Server error: request timed out. ${err}`));
  });
};

export default accessAPI;
