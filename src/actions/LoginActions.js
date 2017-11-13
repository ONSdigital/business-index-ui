/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import { browserHistory } from 'react-router';
import base64 from 'base-64';
import { SET_AUTH, SET_CONFETTI, USER_LOGOUT, SENDING_REQUEST, SET_ERROR_MESSAGE, SET_USER_DETAILS } from '../constants/LoginConstants';
import * as errorMessages from '../constants/MessageConstants';
import auth from '../utils/auth';
import { getUiInfo, getApiInfo } from '../actions/InfoActions';

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
    auth.login(username, basicAuth, (success, data) => {
      // When the request is finished, hide the loading indicator
      dispatch(sendingRequest(false));
      dispatch(setAuthState(success));
      if (success) {
        dispatch(setConfetti(data.showConfetti));
        // If the login worked, forward the user to the dashboard and clear the form
        dispatch(setUserState({
          username,
          role: data.role,
          accessToken: data.accessToken,
        }));
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('username', username);
        dispatch(getUiInfo());
        dispatch(getApiInfo());
        // We setQuery to {} as a hacky solution to the issue below:
        // https://github.com/ONSdigital/bi-ui/issues/3
        // dispatch(setQuery(SET_MATCH_QUERY, {}));
        // dispatch(setQuery(SET_RANGE_QUERY, {}));
        forwardTo('/Home');
      } else {
        switch (data.type) {
          case 'user-doesnt-exist':
            dispatch(setErrorMessage(errorMessages.USER_NOT_FOUND));
            return;
          case 'password-wrong':
            dispatch(setErrorMessage(errorMessages.WRONG_PASSWORD));
            return;
          default:
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
        }
      }
    });
  };
}

/**
 * Check the users token
 */
export function checkAuth(username, token) {
  return (dispatch) => {
    auth.checkToken(token, (success, data) => {
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
          username: data.username,
          accessToken: data.newAccessToken,
        }));
        sessionStorage.setItem('accessToken', data.newAccessToken);
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
    auth.logout(sessionStorage.accessToken, (success) => {
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
