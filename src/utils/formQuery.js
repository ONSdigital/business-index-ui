import config from '../config/form-query';
const { SEPERATOR, LIMIT, ES_CONCAT, END_SEPERATOR } = config;

export function formMatchQuery(query) {
  const queryArr = Object.keys(query).map(param => {
    return `${param}${SEPERATOR}${query[param]}`;
  });
  const formattedQuery = `${queryArr.join(` ${ES_CONCAT} `)}${END_SEPERATOR}${LIMIT}`;
  return formattedQuery;
}

export function formRangeQuery(query) {
  const queryArr = Object.keys(query).map(param => {
    console.log('param is: ', query[param].constructor.name);
    console.log(query[param].constructor.name);
    if (param === 'IndustryCode') {
      // API format: IndustryCode:[${min} TO ${max}]
      return `${param}${SEPERATOR}[${query[param][0]} TO ${query[param][1]}]`;
    } else if (param === 'PostCode') {
      // API format: PostCode:(${postCode})
      return `${param}${SEPERATOR}(${query[param]})`;
    }
    //if (query[param].constructor === Array) {
      // This is for the IndustryCode min/max
      const t = `${param}${SEPERATOR}[${query[param][0]} TO ${query[param][1]}]`;
      console.log('t is: ', t)
      return t;
    //}
    //return `${param}${SEPERATOR}${query[param]}`;
  });
  const formattedQuery = `${queryArr.join(` ${ES_CONCAT} `)}${END_SEPERATOR}${LIMIT}`;
  console.log('formattedQuery: ', formattedQuery);
  return formattedQuery;
}
