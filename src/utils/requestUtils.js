/**
 * @const formPromise - Mock a response from the API, with a random delay
 *
 * @param {Function} json - The function that returns some JSON
 *
 * @return {Promise} Returns a successful promise, using the same format as fetch
 *
 */
export const formPromise = (json) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, json, headers: [] });
    }, Math.floor(Math.random() * 800) + 100);
  });
};


/**
 * @const makeId - Return a string of random characters
 *
 * @param {Number} length - The length of the string to create
 *
 * @return {String} Returns a string of random characters
 *
 */
export const makeId = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  return Array.from({ length }, () => possible[Math.floor(Math.random() * possible.length) + 0]).join('');
};


/**
 * @const randomArr - Return a single business with random attributes
 *
 * @param {Object} options - JSON with a mandatory length field (upper/lower are optional)
 *
 * @return {Array} Returns an array of the specified length with random data
 *
 */
export const randomArr = ({ length, lower = 10000, upper = 900000 }) => {
  return Array.from({ length }, () => (Math.floor(Math.random() * upper) + lower));
};


/**
 * @const returnBusiness - Return a single business with random attributes
 *
 * @return {Object} Returns a single object
 *
 */
export const returnBusiness = () => ({
  id: Math.floor(Math.random() * 900000000000) + 100000000000,
  businessName: makeId(10),
  uPRN: Math.floor(Math.random() * 900000000000) + 100000000000,
  industryCode: Math.floor(Math.random() * 90000) + 10000,
  legalStatus: Math.floor(Math.random() * 8) + 1,
  tradingStatus: ['A', 'C', 'D', 'I'][Math.floor(Math.random() * 4) + 0],
  turnover: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'][Math.floor(Math.random() * 9) + 0],
  employmentBands: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'][Math.floor(Math.random() * 9) + 0],
  postCode: `${makeId(4).toUpperCase()} ${makeId(3).toUpperCase()}`,
  companyNo: makeId(8).toUpperCase(),
  vatRefs: randomArr({ length: Math.floor(Math.random() * 6) + 0 }),
  payeRefs: randomArr({ length: Math.floor(Math.random() * 6) + 0 }),
});


/**
 * @const returnAuthJson - Return JSON that matches the login/checkToken JSON
 *
 * @return {Object} Returns an object matching the format of the API auth routes
 *
 */
export const returnAuthJson = () => ({
  accessToken: '7cc42d22-2777-11e8-b467-0ed5f89f718b',
  username: 'admin',
  role: 'admin',
  showConfetti: false,
});


/**
 * @const returnSearch - Return random number of mock search results for Match/Range search
 *
 * @return {Array} Returns an array of JSON
 *
 */
export const returnSearch = () => {
  return Array.from({ length: Math.floor(Math.random() * 10000) + 5 }, () => returnBusiness());
};
