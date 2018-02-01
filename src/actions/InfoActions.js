import { SET_UI_INFO, SET_API_INFO, SENDING_UI_REQUEST, SENDING_API_REQUEST, SET_UI_ERROR_MESSAGE, SET_API_ERROR_MESSAGE } from '../constants/InfoConstants';
import accessAPI from '../utils/accessAPI';
import config from '../config/api-urls';

const { AUTH_URL, REROUTE_URL } = config;

/**
 * Get info (version/last updated) from the Node server
 */
export function getUiInfo() {
  return (dispatch) => {
    dispatch(sendingRequest(SENDING_UI_REQUEST, true));

    accessAPI(`${AUTH_URL}/api/info`, 'GET', sessionStorage.accessToken, {}, (success, data) => {
      dispatch(sendingRequest(SENDING_UI_REQUEST, false));
      if (success) {
        dispatch(setInfo(SET_UI_INFO, {
          version: data.json.version,
          lastUpdate: data.json.lastUpdate,
        }));
      } else {
        dispatch(setErrorMessage(SET_UI_ERROR_MESSAGE, data.message));
      }
    });
  };
}

/**
 * Get info (version/last updated/last data update) from the API
 */
export function getApiInfo() {
  return (dispatch) => {
    dispatch(sendingRequest(SENDING_API_REQUEST, true));

    accessAPI(REROUTE_URL, 'POST', sessionStorage.accessToken, JSON.stringify({
      method: 'GET',
      endpoint: 'version',
    }), (success, data) => {
      dispatch(sendingRequest(SENDING_API_REQUEST, false));
      if (success) {
        dispatch(setInfo(SET_API_INFO, {
          version: data.json.version,
          lastApiUpdate: data.json.builtAtString,
          lastDataUpdate: data.json.lastDataUpdate,
        }));
      } else {
        dispatch(setErrorMessage(SET_API_ERROR_MESSAGE, data.message));
      }
    });
  };
}

export function setInfo(type, newState) {
  return { type, newState };
}

export function sendingRequest(type, sending) {
  return { type, sending };
}

function setErrorMessage(type, message) {
  return { type, message };
}
