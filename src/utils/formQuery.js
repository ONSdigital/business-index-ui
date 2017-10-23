import config from '../config/form-query';
const { SEPERATOR, MATCH_END, ES_CONCAT, END_SEPERATOR } = config;

export function formMatchQuery(query) {
  const queryArr = Object.keys(query).map(param => {
    return `${param}${SEPERATOR}${query[param]}`;
  });
  const formattedQuery = `${queryArr.join(` ${ES_CONCAT} `)}${END_SEPERATOR}${MATCH_END}`;
  return formattedQuery;
}
