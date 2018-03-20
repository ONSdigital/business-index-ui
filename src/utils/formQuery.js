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
 */
const formMatchQuery = (query) => {
  const queryArr = Object.keys(query).map(param => {
    if (param === 'BusinessName') {
      return `${param}${SEPERATOR}${encodeSpecialChars(query[param])}`;
    }
    return `${param}${SEPERATOR}${query[param]}`;
  });
  const formattedQuery = `${SEARCH_ENDPOINT}${queryArr.join(` ${ES_CONCAT} `)}${END_SEPERATOR}${LIMIT}`;
  return formattedQuery;
};

// const formRangeQuery = (query) => {
//   const queryArr = Object.keys(query).map(param => {
//     if (param === 'IndustryCode') {
//       // ES format: IndustryCode:[${min} TO ${max}]
//       return `${param}${SEPERATOR}%5B${query[param][0]} TO ${query[param][1]}%5D`;
//     } else if (param === 'PostCode') {
//       // ES format: PostCode:(${postCode})
//       return `${param}${SEPERATOR}(${query[param]})`;
//     }
//     // ES format: Param:(A OR B OR C)
//     return `${param}${SEPERATOR}(${query[param].join(' OR ')})`;
//   });
//   const formattedQuery = `${SEARCH_ENDPOINT}${queryArr.join(` ${ES_CONCAT} `)}${END_SEPERATOR}${LIMIT}`;
//   return formattedQuery;
// };

export { formMatchQuery };
