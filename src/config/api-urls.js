const apiUrls = {
  AUTH_URL: process.env.REACT_APP_AUTH_URL,
  REROUTE_URL: process.env.REACT_APP_API_URL,
  SEARCH_ENDPOINT: 'search/',
  BUSINESS_ENDPOINT: 'business',
  API_VERSION: 'v1',
};

console.log('AUTH_URL: ', apiUrls.AUTH_URL);
console.log('process.env.REACT_APP_AUTH_URL: ', process.env.REACT_APP_AUTH_URL);

export default apiUrls;
