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
    if (param === 'IndustryCode') {
      // ES format: IndustryCode:[${min} TO ${max}]
      return `${param}${SEPERATOR}[${query[param][0]} TO ${query[param][1]}]`;
    } else if (param === 'PostCode') {
      // ES format: PostCode:(${postCode})
      return `${param}${SEPERATOR}(${query[param]})`;
    }
    // ES format: Param:(A OR B OR C)
    return `${param}${SEPERATOR}(${query[param].join(' OR ')})`;
  });
  const formattedQuery = `${queryArr.join(` ${ES_CONCAT} `)}${END_SEPERATOR}${LIMIT}`;
  return formattedQuery;
}
