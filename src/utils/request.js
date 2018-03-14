/**
 * @const fakeFetch - Use a mock fetch if we are in a test environment
 *
 * @param {String} url - The URL to get data from
 * @param {Object} options - Request options
 *
 * @return {Fetch} Returns either the real fetch or a mocked version with test data
 *
 */
const fakeFetch = (url, options) => {
  const { requestType } = options;

  // Mock a response from the API
  const formPromise = (json) => new Promise((resolve) => resolve({ status: 200, json, headers: [] }));

  switch (requestType) {
    case 'login': return formPromise(() => ({
      accessToken: 'abc-123',
      username: 'admin',
      role: 'admin',
      showConfetti: false,
    }));
    case 'checkAuth': return formPromise(() => ({
      accessToken: 'abc-123',
      username: 'admin',
      role: 'admin',
      showConfetti: false,
    }));
    case 'logout': return formPromise(() => ({}));
    case 'apiInfo': return formPromise(() => ({ version: '0.0.1', lastUpdate: new Date().toDateString() }));
    case 'uiInfo': return formPromise(() => ({ version: '0.0.1', lastUpdate: new Date().toDateString() }));
    case 'search': return formPromise(() => ([{
      id: 12345,
      businessName: 'abc',
      uPRN: 'abc',
      industryCode: '01280',
      legalStatus: '1',
      tradingStatus: 'A',
      turnover: 'A',
      employmentBands: 'A',
      postCode: 'abc',
    }]));
    case 'business': return formPromise(() => ({
      id: 12345,
      businessName: 'abc',
      uPRN: 'abc',
      industryCode: '01280',
      legalStatus: '1',
      tradingStatus: 'A',
      turnover: 'A',
      employmentBands: 'A',
      postCode: 'abc',
      companyNo: 'AB123456',
      vatRefs: [1, 2],
      payeRefs: ['1'],
    }));
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
