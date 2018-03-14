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

    accessAPI(`${AUTH_URL}/api/info`, 'GET', sessionStorage.accessToken, {}, 'uiInfo').then(json => {
      dispatch(sendingRequest(SENDING_UI_REQUEST, false));
      dispatch(setInfo(SET_UI_INFO, {
        version: json.version,
        lastUpdate: json.lastUpdate,
      }));
    }).catch(msg => {
      dispatch(sendingRequest(SENDING_UI_REQUEST, false));
      dispatch(setErrorMessage(SET_UI_ERROR_MESSAGE, msg));
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
    }), 'apiInfo').then(json => {
      dispatch(sendingRequest(SENDING_API_REQUEST, false));
      dispatch(setInfo(SET_API_INFO, {
        version: json.version,
        lastApiUpdate: json.builtAtString,
        lastDataUpdate: json.lastDataUpdate,
      }));
    }).catch(msg => {
      dispatch(sendingRequest(SENDING_API_REQUEST, false));
      dispatch(setErrorMessage(SET_API_ERROR_MESSAGE, msg));
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
