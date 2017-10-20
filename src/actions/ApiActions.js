import { browserHistory } from 'react-router';
import { REFS, ADD_MOST_RECENT_ERROR, REMOVE_LAST_ERROR, SET_PERIOD, SET_REF_RESULTS, SET_REF_HEADERS, SENDING_REF_REQUEST, SET_REF_QUERY, SET_REF_ERROR_MESSAGE } from '../constants/ApiConstants';
import apiSearch from '../utils/apiSearch';
import { getDestination } from '../utils/helperMethods';
import { store } from '../routes';
import periods from '../config/periods';

/**
 * Get info (version/last updated) from the Node server
 */
export function refSearch(query) {
  return (dispatch) => {
    // Reset the period, so that the period toggle shows the
    // correct default value on the data results page
    dispatch(setPeriod(SET_PERIOD, periods.DEFAULT_PERIOD));

    dispatch(setErrorMessage(SET_REF_ERROR_MESSAGE, '', ''));
    dispatch(sendingRequest(SENDING_REF_REQUEST, true));
    dispatch(setResults(SET_REF_RESULTS, { results: [] }));
    dispatch(setQuery(SET_REF_QUERY, query));
    apiSearch.getRef(query, (success, data) => {
      dispatch(sendingRequest(SENDING_REF_REQUEST, false));
      if (success) {
        dispatch(setResults(SET_REF_RESULTS, {
          results: data.results,
        }));
        dispatch(setResults(REFS[data.results[0].unitType].setResults, {
          results: data.results,
        }));
        dispatch(setHeaders(SET_REF_HEADERS, {
          headers: data.response,
        }));

        // If the unitType that is returned is not an ENT, do an additional
        // search to get that data
        if (data.results[0].unitType !== 'ENT') {
          apiSearch.getSpecificRefById(REFS['ENT'].apiEndpoint, data.results[0].parents['ENT'], (success, data) => {
            if (success) {
              dispatch(setResults(REFS['ENT'].setResults, {
                results: [data.results],
              }));
              dispatch(setHeaders(REFS['ENT'].setHeaders, {
                headers: data.response,
              }));
            } else {
              dispatch(setErrorMessage(REFS['ENT'].setError, data.message, Math.floor(new Date() / 1000)));
              dispatch(addMostRecentError('ENT', data.message, Math.floor(new Date() / 1000)));
            }
          });
        }

        // if (data.results.length === 1) {
          const source = data.results[0].unitType;
          const destination = getDestination(source);
          browserHistory.push(`/${destination}/${query}`);
        // }
      } else {
        dispatch(setErrorMessage(SET_REF_ERROR_MESSAGE, data.message, Math.floor(new Date() / 1000)));
      }
    });
  };
}

export function getSpecificUnitType(unitType, id, redirect = false) {
  return (dispatch) => {
    if (unitType === 'LEU') {
      // For LEU, period is not yet implemented, so get the default one
      return dispatch(getUnitForDefaultPeriod(unitType, id, redirect));
    }
    const period = store.getState().apiSearch.period.split('-').join('');
    return dispatch(getUnitForSpecificPeriod(unitType, id, period, redirect));
  };
}

/**
 * Get specific unit by id
 *
 * This is a generic method that can do a specific search for any REF type.
 */
export function getUnitForDefaultPeriod(unitType, id, redirect = false) {
  return (dispatch) => {
    dispatch(setErrorMessage(REFS[unitType].setError, '', ''));
    dispatch(sendingRequest(REFS[unitType].setSending, true));
    dispatch(setResults(REFS[unitType].setResults, { results: [] }));
    dispatch(setQuery(REFS[unitType].setQuery, id));
    apiSearch.getSpecificRefById(REFS[unitType].apiEndpoint, id, (success, data) => {
      dispatch(sendingRequest(REFS[unitType].setSending, false));
      if (success) {
        dispatch(setResults(REFS[unitType].setResults, {
          results: [data.results],
        }));
        dispatch(setHeaders(REFS[unitType].setHeaders, {
          headers: data.response,
        }));
        // If the user goes straight to /Enterprises/:id without going via
        // the search, we don't want to redirect them as they are already on
        // the correct page
        if (redirect) {
          browserHistory.push(`/${REFS[unitType].url}/${id}`);
        }
      } else {
        dispatch(setErrorMessage(REFS[unitType].setError, data.message, Math.floor(new Date() / 1000)));
        dispatch(addMostRecentError(unitType, data.message, Math.floor(new Date() / 1000)));
      }
    });
  };
}

/**
 * Get specific unit by id and period
 *
 * This is a generic method that can do a specific search for any REF type by specific period
 */
export function getUnitForSpecificPeriod(unitType, id, period, redirect = false) {
  return (dispatch) => {
    dispatch(setErrorMessage(REFS[unitType].setError, '', ''));
    dispatch(sendingRequest(REFS[unitType].setSending, true));
    // dispatch(setResults(REFS[unitType].setResults, { results: [] }));
    dispatch(setQuery(REFS[unitType].setQuery, id));
    apiSearch.getSpecificRefByIdAndPeriod(REFS[unitType].apiEndpoint, id, period, (success, data) => {
      dispatch(sendingRequest(REFS[unitType].setSending, false));
      if (success) {
        dispatch(setResults(REFS[unitType].setResults, {
          results: [data.results],
        }));
        dispatch(setHeaders(REFS[unitType].setHeaders, {
          headers: data.response,
        }));
        // If the user goes straight to /Enterprises/:id without going via
        // the search, we don't want to redirect them as they are already on
        // the correct page
        if (redirect) {
          browserHistory.push(`/${REFS[unitType].url}/${id}`);
        }
      } else {
        dispatch(setErrorMessage(REFS[unitType].setError, data.message, Math.floor(new Date() / 1000)));
        dispatch(addMostRecentError(unitType, data.message, Math.floor(new Date() / 1000)));
      }
    });
  };
}

/**
 * Change the period
 *
 * This is related to the period dropdown that is present on all the
 * data view pages (apart from LEU)
 */
export function changePeriod(period) {
  // Everytime the user changes the period, we need to get the
  // childrenJson (for the tree view) again from the Enterprise.
  return (dispatch) => {
    dispatch(setPeriod(SET_PERIOD, period));
    // There is always an Enterprise in the store, so get the id
    const entId = store.getState().apiSearch.enterprise.results[0].id;
    dispatch(getUnitForSpecificPeriod('ENT', entId, period.split('-').join(''), false));
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

export function setHeaders(type, newState) {
  return { type, newState };
}

export function sendingRequest(type, sending) {
  return { type, sending };
}

function setErrorMessage(type, message, timeStamp) {
  return { type, message, timeStamp };
}
