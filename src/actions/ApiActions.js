import { SET_RESULTS, SET_FORMATTED_QUERY, SET_SEARCH_ERROR_MESSAGE, SENDING_SEARCH_REQUEST, SET_QUERY } from '../constants/ApiConstants';
import accessAPI from '../utils/accessAPI';
import config from '../config/api-urls';

const { REROUTE_URL, API_VERSION } = config;

// The search action creator can be used for Match/Range/UBRN searches
export function search(query, formQuery, jsonKey) {
  return (dispatch) => {
    dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, '', jsonKey));
    dispatch(sendingRequest(SENDING_SEARCH_REQUEST, true, jsonKey));
    dispatch(setResults(SET_RESULTS, [], jsonKey));
    dispatch(setQuery(SET_QUERY, query, jsonKey));
    const formattedQuery = formQuery(query);
    dispatch(setFormattedQuery(SET_FORMATTED_QUERY, formattedQuery, jsonKey));

    accessAPI(REROUTE_URL, 'POST', sessionStorage.accessToken, JSON.stringify({
      method: 'GET',
      endpoint: `${API_VERSION}/${formattedQuery}`,
    })).then(json => {
      dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false, jsonKey));
      // This is a workaround for the API returning 200 {} for no results, should be 404
      if (Object.keys(json).length === 0 && json.constructor === Object) {
        dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, '404: No results found.', jsonKey));
      } else if (jsonKey === 'ubrn') {
        // Wrap the results in an array as we only get {} from the API
        dispatch(setResults(SET_RESULTS, [json], jsonKey));
      } else {
        dispatch(setResults(SET_RESULTS, json, jsonKey));
      }
    }).catch(msg => {
      dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false, jsonKey));
      dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, msg.toString(), jsonKey));
    });
  };
}

export function setResults(type, results, jsonKey) {
  return { type, results, jsonKey };
}

export function setQuery(type, query, jsonKey) {
  return { type, query, jsonKey };
}

function setFormattedQuery(type, query, jsonKey) {
  return { type, query, jsonKey };
}

function sendingRequest(type, sending, jsonKey) {
  return { type, sending, jsonKey };
}

function setErrorMessage(type, message, jsonKey) {
  return { type, message, jsonKey };
}
