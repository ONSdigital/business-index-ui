import { SET_RESULTS, SET_FORMATTED_QUERY, SET_SEARCH_ERROR_MESSAGE, SENDING_SEARCH_REQUEST, SET_QUERY, SET_HEADERS } from '../constants/ApiConstants';
import apiSearch from '../utils/apiSearch';
import { formMatchQuery, formRangeQuery } from '../utils/formQuery';

/**
 * Do a match search
 */
export function matchSearch(query) {
  return (dispatch) => {
    dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, '', '', 'match'));
    dispatch(sendingRequest(SENDING_SEARCH_REQUEST, true, 'match'));
    dispatch(setResults(SET_RESULTS, [], 'match'));
    dispatch(setQuery(SET_QUERY, query, 'match'));
    const formattedQuery = formMatchQuery(query);
    dispatch(setFormattedQuery(SET_FORMATTED_QUERY, formattedQuery, 'match'));
    apiSearch.match(formattedQuery, (success, data) => {
      dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false, 'match'));
      if (success) {
        // This is a workaround for the API returning 200 {} for no results, should be 404
        if (Object.keys(data.results).length === 0 && data.results.constructor === Object) {
          dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, '404: No results found.', Math.floor(new Date() / 1000), 'match'));
        } else {
          dispatch(setResults(SET_RESULTS, data.results, 'match'));
          dispatch(setHeaders(SET_HEADERS, data.response, 'match'));
        }
      } else {
        dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, data.message, Math.floor(new Date() / 1000), 'match'));
      }
    });
  };
}

/**
 * Do a range search
 */
export function rangeSearch(query) {
  return (dispatch) => {
    dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, '', '', 'range'));
    dispatch(sendingRequest(SENDING_SEARCH_REQUEST, true, 'range'));
    dispatch(setResults(SET_RESULTS, [], 'range', 'range'));
    dispatch(setQuery(SET_QUERY, query, 'range'));
    const formattedQuery = formRangeQuery(query);
    dispatch(setFormattedQuery(SET_FORMATTED_QUERY, formattedQuery, 'range'));
    apiSearch.match(formattedQuery, (success, data) => {
      dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false, 'range'));
      if (success) {
        // This is a workaround for the API returning 200 {} for no results, should be 404
        if (Object.keys(data.results).length === 0 && data.results.constructor === Object) {
          dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, '404: No results found.', Math.floor(new Date() / 1000), 'range'));
        } else {
          dispatch(setResults(SET_RESULTS, data.results, 'range'));
          dispatch(setHeaders(SET_HEADERS, data.response, 'range'));
        }
      } else {
        dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, data.message, Math.floor(new Date() / 1000), 'range'));
      }
    });
  };
}

/**
 * Do a UBRN search
 */
export function ubrnSearch(query) {
  return (dispatch) => {
    dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, '', '', 'ubrn'));
    dispatch(sendingRequest(SENDING_SEARCH_REQUEST, true, 'ubrn'));
    dispatch(setResults(SET_RESULTS, [], 'ubrn'));
    dispatch(setQuery(SET_QUERY, query, 'ubrn'));
    const formattedQuery = query.id;
    apiSearch.ubrn(formattedQuery, (success, data) => {
      dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false, 'ubrn'));
      if (success) {
        // This is a workaround for the API returning 200 {} for no results, should be 404
        if (Object.keys(data.results).length === 0 && data.results.constructor === Object) {
          dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, '404: No results found.', Math.floor(new Date() / 1000), 'ubrn'));
        } else {
          // Wrap the results in an array as we only get {} from the API
          dispatch(setResults(SET_RESULTS, [data.results], 'ubrn'));
          dispatch(setHeaders(SET_HEADERS, data.response, 'ubrn'));
        }
      } else {
        dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, data.message, Math.floor(new Date() / 1000), 'ubrn'));
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

function setErrorMessage(type, message, timeStamp, jsonKey) {
  return { type, message, timeStamp, jsonKey };
}
