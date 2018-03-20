import { browserHistory } from 'react-router';
import { SET_RESULTS, SET_TO_HIGHLIGHT, SET_FORMATTED_QUERY, SET_SEARCH_ERROR_MESSAGE, SENDING_SEARCH_REQUEST, SET_QUERY } from '../constants/ApiConstants';
import accessAPI from '../utils/accessAPI';
import config from '../config/api-urls';

const { REROUTE_URL, API_VERSION } = config;

const setFormattedQuery = (type, query) => ({ type, query });
const sendingRequest = (type, sending) => ({ type, sending });
const setErrorMessage = (type, message) => ({ type, message });

export const resetResults = () => ({ type: SET_RESULTS, results: [] });
export const setToHighlight = (toHighlight) => ({ type: SET_TO_HIGHLIGHT, toHighlight });
export const setResults = (type, results) => ({ type, results });
export const setQuery = (type, query) => ({ type, query });

/**
 * @const search - This is an async action that will handle the whole process
 * of doing a search, including setting spinners/error messages and the results.
 *
 * @param {Object} query - THe query object
 * @param {Function} formQuery - A function to transform the query object a string
 * @param {Boolean} redirect - Whether or not to go to /Results after the search
 */
export const search = (query, formQuery, redirect) => (dispatch) => {
  dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, ''));
  dispatch(sendingRequest(SENDING_SEARCH_REQUEST, true));
  dispatch(setResults(SET_RESULTS, []));
  dispatch(setQuery(SET_QUERY, query));
  const formattedQuery = formQuery(query);
  dispatch(setFormattedQuery(SET_FORMATTED_QUERY, formattedQuery));

  accessAPI(REROUTE_URL, 'POST', sessionStorage.accessToken, JSON.stringify({
    method: 'GET',
    endpoint: `${API_VERSION}/${formattedQuery}`,
  }), 'search').then(json => {
    dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
    // This is a workaround for the API returning 200 {} for no results, should be 404
    if (Object.keys(json).length === 0 && json.constructor === Object) {
      dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, '404: No results found.'));
    } else if (Object.keys(json).length > 0 && json.constructor === Object) {
      // Wrap the results in an array as we only get {} from the API
      dispatch(setResults(SET_RESULTS, [json]));
      if (redirect) browserHistory.push('/Results');
    } else {
      dispatch(setResults(SET_RESULTS, json));
      if (redirect) browserHistory.push('/Results');
    }
  }).catch(msg => {
    dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
    dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, msg.toString()));
  });
};
