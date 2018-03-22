import { formPromise, returnAuthJson, returnSearch, returnBusiness } from './requestUtils';

/**
 * @const fakeFetch - Use a mock fetch if we are in a test environment
 *
 * @param {String} url - The URL to get data from
 * @param {Object} options - Request options
 *
 * @return {Fetch} Returns either the real fetch or a mocked version with test data
 */
const fakeFetch = (url, options) => {
  const { requestType } = options;

  // Depending on the type of request, return different JSON
  switch (requestType) {
    case 'login': return formPromise(() => returnAuthJson());
    case 'checkAuth': return formPromise(() => returnAuthJson());
    case 'logout': return formPromise(() => ({})); // We just need a 200 OK for logging out
    case 'apiInfo': return formPromise(() => ({ version: '0.0.1', lastUpdate: new Date().toDateString() }));
    case 'uiInfo': return formPromise(() => ({ version: '0.0.1', lastUpdate: new Date().toDateString() }));
    case 'search': return formPromise(() => returnSearch());
    case 'business': return formPromise(() => returnBusiness());
    default: return 'Error';
  }
};

// If we are in a test environment, we use the fake fetch we created above
export default ((env) => {
  switch (env) {
    case 'test':
      return fakeFetch;
    default:
      return fetch;
  }
})(process.env.REACT_APP_ENV);
