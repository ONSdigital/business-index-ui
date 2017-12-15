import { SET_RESULTS, SET_FORMATTED_QUERY, SET_SEARCH_ERROR_MESSAGE, SENDING_SEARCH_REQUEST, SET_QUERY, SET_HEADERS } from '../constants/ApiConstants';
import apiSearch from '../utils/apiSearch';

// The search action creator can be used for Match/Range/UBRN searches
export function search(query, formQuery, jsonKey) {
  return (dispatch) => {
    dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, '', jsonKey));
    dispatch(sendingRequest(SENDING_SEARCH_REQUEST, true, jsonKey));
    dispatch(setResults(SET_RESULTS, [], jsonKey));
    dispatch(setQuery(SET_QUERY, query, jsonKey));
    const formattedQuery = formQuery(query);
    dispatch(setFormattedQuery(SET_FORMATTED_QUERY, formattedQuery, jsonKey));
    apiSearch.search(formattedQuery, (success, data) => {
      dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false, jsonKey));
      if (success) {
        // This is a workaround for the API returning 200 {} for no results, should be 404
        if (Object.keys(data.results).length === 0 && data.results.constructor === Object) {
          dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, '404: No results found.', jsonKey));
        } else {
          if (jsonKey === 'ubrn') {
            // Wrap the results in an array as we only get {} from the API
            dispatch(setResults(SET_RESULTS, [data.results], jsonKey));
          } else {
            dispatch(setResults(SET_RESULTS, data.results, jsonKey));
          }
          dispatch(setHeaders(SET_HEADERS, data.response, jsonKey));
        }
      } else {
        dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, data.message, jsonKey));
      }
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

function setHeaders(type, headers, jsonKey) {
  return { type, headers, jsonKey };
}

function sendingRequest(type, sending, jsonKey) {
  return { type, sending, jsonKey };
}

function setErrorMessage(type, message, jsonKey) {
  return { type, message, jsonKey };
}
