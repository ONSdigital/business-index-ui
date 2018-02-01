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
const accessAPI = (url, method, auth, body, callback) => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body,
  }).then((response) => {
    switch (response.status) {
      case 200: return response.json().then((json) => callback(true, { json }));
      case 401: return callback(false, { message: 'Unable to login.' });
      case 500: return callback(false, { message: 'Unable to login.' });
      default: return callback(false, { message: 'Unable to login.' });
    }
  }).catch((err) => callback(false, { message: `Server error: request timed out. ${err}` }));
};

export default accessAPI;
