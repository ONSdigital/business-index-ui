import { SET_MATCH_FORMATTED_QUERY, ADD_MOST_RECENT_ERROR, REMOVE_LAST_ERROR, SET_UBRN_ERROR_MESSAGE, SENDING_UBRN_REQUEST, SET_UBRN_RESULTS, SET_UBRN_QUERY, SET_UBRN_HEADERS, SET_RANGE_HEADERS, SET_RANGE_ERROR_MESSAGE, SENDING_RANGE_REQUEST, SET_RANGE_RESULTS, SET_RANGE_QUERY, SET_PERIOD, SET_MATCH_RESULTS, SET_MATCH_HEADERS, SENDING_MATCH_REQUEST, SET_MATCH_QUERY, SET_MATCH_ERROR_MESSAGE } from '../constants/ApiConstants';
import apiSearch from '../utils/apiSearch';
import { formMatchQuery } from '../utils/formQuery';
import periods from '../config/periods';

/**
 * Do a match search
 */
export function matchSearch(query) {
  return (dispatch) => {
    // Reset the period, so that the period toggle shows the
    // correct default value on the data results page
    dispatch(setPeriod(SET_PERIOD, periods.DEFAULT_PERIOD));

    dispatch(setErrorMessage(SET_MATCH_ERROR_MESSAGE, '', ''));
    dispatch(sendingRequest(SENDING_MATCH_REQUEST, true));
    dispatch(setResults(SET_MATCH_RESULTS, { results: [] }));
    dispatch(setQuery(SET_MATCH_QUERY, query));
    const formattedQuery = formMatchQuery(query);
    dispatch(setFormattedQuery(SET_MATCH_FORMATTED_QUERY, formattedQuery));
    apiSearch.match(formattedQuery, (success, data) => {
      dispatch(sendingRequest(SENDING_MATCH_REQUEST, false));
      if (success) {
        dispatch(setResults(SET_MATCH_RESULTS, {
          results: data.results,
        }));
        dispatch(setHeaders(SET_MATCH_HEADERS, {
          headers: data.response,
        }));
      } else {
        dispatch(setErrorMessage(SET_MATCH_ERROR_MESSAGE, data.message, Math.floor(new Date() / 1000)));
      }
    });
  };
}

/**
 * Do a range search
 */
export function rangeSearch(query) {
  return (dispatch) => {
    // Reset the period, so that the period toggle shows the
    // correct default value on the data results page
    dispatch(setPeriod(SET_PERIOD, periods.DEFAULT_PERIOD));

    dispatch(setErrorMessage(SET_RANGE_ERROR_MESSAGE, '', ''));
    dispatch(sendingRequest(SENDING_RANGE_REQUEST, true));
    dispatch(setResults(SET_RANGE_RESULTS, { results: [] }));
    dispatch(setQuery(SET_RANGE_QUERY, query));
    apiSearch.match(query, (success, data) => {
      dispatch(sendingRequest(SENDING_RANGE_REQUEST, false));
      if (success) {
        dispatch(setResults(SET_RANGE_RESULTS, {
          results: data.results,
        }));
        dispatch(setHeaders(SET_RANGE_HEADERS, {
          headers: data.response,
        }));
      } else {
        dispatch(setErrorMessage(SET_RANGE_ERROR_MESSAGE, data.message, Math.floor(new Date() / 1000)));
      }
    });
  };
}

/**
 * Do a UBRN search
 */
export function ubrnSearch(id) {
  return (dispatch) => {
    // Reset the period, so that the period toggle shows the
    // correct default value on the data results page
    dispatch(setPeriod(SET_PERIOD, periods.DEFAULT_PERIOD));

    dispatch(setErrorMessage(SET_UBRN_ERROR_MESSAGE, '', ''));
    dispatch(sendingRequest(SENDING_UBRN_REQUEST, true));
    dispatch(setResults(SET_UBRN_RESULTS, { results: [] }));
    dispatch(setQuery(SET_UBRN_QUERY, id));
    apiSearch.ubrn(id, (success, data) => {
      dispatch(sendingRequest(SENDING_UBRN_REQUEST, false));
      if (success) {
        dispatch(setResults(SET_UBRN_RESULTS, {
          results: data.results,
        }));
        dispatch(setHeaders(SET_UBRN_HEADERS, {
          headers: data.response,
        }));
      } else {
        dispatch(setErrorMessage(SET_UBRN_ERROR_MESSAGE, data.message, Math.floor(new Date() / 1000)));
      }
    });
  };
}

export function addMostRecentError(unitType, errorMessage, timeStamp) {
  return { type: ADD_MOST_RECENT_ERROR, unitType, errorMessage, timeStamp };
}

export function removeLastError() {
  return { type: REMOVE_LAST_ERROR };
}

export function setResults(type, newState) {
  return { type, newState };
}

export function setPeriod(type, period) {
  return { type, period };
}

export function setQuery(type, query) {
  return { type, query };
}

export function setFormattedQuery(type, query) {
  return { type, query };
}

export function setHeaders(type, newState) {
  return { type, newState };
}

export function sendingRequest(type, sending) {
  return { type, sending };
}

function setErrorMessage(type, message, timeStamp) {
  return { type, message, timeStamp };
}
