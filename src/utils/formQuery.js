import config from '../config/form-query';
import urls from '../config/api-urls';

const { SEPERATOR, LIMIT, ES_CONCAT, END_SEPERATOR } = config;
const { SEARCH_ENDPOINT } = urls;


/**
 * @const encodeSpecialChars - Encode special characters (for ElasticSearch)
 *
 * @param {String} businessName - The business name to encode
 *
 * @return {String} - The encoded string
 */
const encodeSpecialChars = (businessName) => {
  const encodedName = encodeURIComponent(businessName);
  if (encodedName.includes('%A3')) {
    encodedName.replace('%A3,%C2%A3');
  }
  return encodedName;
};


/**
 * @const formMatchQuery - Form the query for the match search, where the query
 * object that is passed in has keys that correspond with the correct API
 * search terms.
 *
 * @param {Object} query - The query object
 *
 * @return {String} - The ElasticSearch compatible query string
 */
const formQuery = (query) => {
  const rangeSearch = ['EmploymentBands', 'Turnover', 'TradingStatus', 'LegalStatus'];
  const refs = ['CompanyNo', 'PayeRefs', 'VatRefs'];
  if (Object.keys(query).includes('Id')) {
    return `business/${query.Id}`;
  } else {
    const queryArr = Object.keys(query).map(param => {
      if (param === 'BusinessName') {
        return `${param}${SEPERATOR}${encodeSpecialChars(query[param])}`;
      } else if (rangeSearch.includes(param)) {
        return `${param}${SEPERATOR}(${query[param].join(' OR ')})`;
      } else if (param === 'Ref') {
        return refs.map(refType => `${refType}${SEPERATOR}${query[param]}`).join(' OR ');
      } else if (param === 'IndustryCode') {
        if ('single' in query[param] && query[param].single !== '') {
          return `${param}${SEPERATOR}${query[param].single}`;
        } else {
          return `${param}${SEPERATOR}%5B${query[param].min} TO ${query[param].max}%5D`;
        }
      }
      return `${param}${SEPERATOR}${query[param]}`;
    });
    return `${SEARCH_ENDPOINT}${queryArr.join(` ${ES_CONCAT} `)}${END_SEPERATOR}${LIMIT}`;
  }
};

export { encodeSpecialChars, formQuery };
