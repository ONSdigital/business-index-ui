import { SET_UI_INFO, SET_API_INFO, SENDING_UI_REQUEST, SENDING_API_REQUEST, SET_UI_ERROR_MESSAGE, SET_API_ERROR_MESSAGE } from '../constants/InfoConstants';
import apiInfo from '../utils/apiInfo';

/**
 * Get info (version/last updated) from the Node server
 */
export function getUiInfo() {
  return (dispatch) => {
    dispatch(sendingRequest(SENDING_UI_REQUEST, true));
    apiInfo.getUiInfo((success, data) => {
      dispatch(sendingRequest(SENDING_UI_REQUEST, false));
      if (success) {
        dispatch(setInfo(SET_UI_INFO, {
          version: data.version,
          lastUpdate: data.lastUpdate,
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
    apiInfo.getApiInfo((success, data) => {
      dispatch(sendingRequest(SENDING_API_REQUEST, false));
      if (success) {
        dispatch(setInfo(SET_API_INFO, {
          version: data.version,
          lastApiUpdate: data.lastApiUpdate,
          lastDataUpdate: data.lastDataUpdate,
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
