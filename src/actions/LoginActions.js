import { browserHistory } from 'react-router';
import base64 from 'base-64';
import { SET_AUTH, SET_CONFETTI, USER_LOGOUT, SENDING_REQUEST, SET_ERROR_MESSAGE, SET_USER_DETAILS } from '../constants/LoginConstants';
import * as errorMessages from '../constants/MessageConstants';
import { getUiInfo, getApiInfo } from '../actions/InfoActions';
import accessAPI from '../utils/accessAPI';
import config from '../config/api-urls';

const { AUTH_URL } = config;

/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */
export function login(username, password) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));

    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ username, password })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }

    const basicAuth = base64.encode(`${username}:${password}`);

    accessAPI(`${AUTH_URL}/auth/login`, 'POST', `Basic ${basicAuth}`, JSON.stringify({
      username,
    }), (success, data) => {
      // When the request is finished, hide the loading indicator
      dispatch(sendingRequest(false));
      dispatch(setAuthState(success));
      if (success) {
        dispatch(setConfetti(data.json.showConfetti));
        // If the login worked, forward the user to the dashboard and clear the form
        dispatch(setUserState({
          username,
          role: data.json.role,
          accessToken: data.json.accessToken,
        }));
        sessionStorage.setItem('accessToken', data.json.accessToken);
        sessionStorage.setItem('username', username);
        dispatch(getUiInfo());
        dispatch(getApiInfo());
        forwardTo('/Home');
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      }
    });
  };
}

/**
 * Check the users token
 */
export function checkAuth() {
  return (dispatch) => {
    accessAPI(`${AUTH_URL}/auth/checkToken`, 'POST', sessionStorage.accessToken, {}, (success, data) => {
      dispatch(setAuthState(success));
      if (!success) {
        sessionStorage.clear();
        forwardTo('/');
      } else if (success) {
        if (window.location.pathname === '/') {
          forwardTo('/Home');
        }
        dispatch(getUiInfo());
        dispatch(getApiInfo());
        dispatch(setUserState({
          username: data.json.username,
          accessToken: data.json.accessToken,
          role: data.json.role,
        }));
        sessionStorage.setItem('accessToken', data.json.accessToken);
      }
    });
  };
}

/**
 * Logs the current user out
 */
export function logout() {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    accessAPI(`${AUTH_URL}/auth/logout`, 'POST', sessionStorage.accessToken, {}, (success, data) => {
      dispatch(sendingRequest(false));
      if (success) {
        dispatch(setAuthState(false));
        sessionStorage.clear();
        browserHistory.push('/');
        // This needs to go at the end, or else if we logout whilst on a page
        // that uses the redux store, an error will occur before the user
        // is redirected to '/'.
        dispatch(resetState(undefined));
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
        sessionStorage.clear();
        browserHistory.push('/');
        dispatch(resetState(undefined));
      }
    });
  };
}

/**
 * Sets the user details state of the application (username, role)
 * @param  {boolean} show              Whether or not to show the the confetti
 * @return {object}                    Formatted action for the reducer to handle
 */
export function setConfetti(show) {
  return { type: SET_CONFETTI, show };
}

export function resetState() {
  return { type: USER_LOGOUT };
}

/**
 * Sets the user details state of the application (username, role)
 * @param  {boolean} newState          The state of the user details
 * @param  {string}  newState.username The new text of the username
 * @param  {string}  newState.role     The new text of the user role
 * @param  {string}  newState.apiKey   The API key for the user
 * @return {object}                    Formatted action for the reducer to handle
 */
export function setUserState(newState) {
  return { type: SET_USER_DETAILS, newState };
}

/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState) {
  return { type: SET_AUTH, newState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}


/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
  return { type: SET_ERROR_MESSAGE, message };
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
  browserHistory.push(location);
}


/**
 * Checks if any elements of a JSON object are empty
 * @param  {object} elements The object that should be checked
 * @return {boolean}         True if there are empty elements, false if there aren't
 */
function anyElementsEmpty(elements) {
  for (let i = 0; i < Object.keys(elements).length; i += 1) {
    if (elements[Object.keys(elements)[i]] === '') {
      return true;
    }
  }
  return false;
}
