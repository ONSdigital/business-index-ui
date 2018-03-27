// import { browserHistory } from 'react-router';
import base64 from 'base-64';
import { SET_AUTH, SET_CONFETTI, USER_LOGOUT, SENDING_REQUEST, SET_ERROR_MESSAGE, SET_USER_DETAILS } from '../constants/LoginConstants';
import * as errorMessages from '../constants/MessageConstants';
import { anyKeyEmpty } from '../utils/helperMethods';
import accessAPI from '../utils/accessAPI';
import config from '../config/api-urls';
import history from '../history';

const { AUTH_URL } = config;

const setConfetti = (show) => ({ type: SET_CONFETTI, show });
const resetState = () => ({ type: USER_LOGOUT });
const setUserState = (newState) => ({ type: SET_USER_DETAILS, newState });
const setAuthState = (newState) => ({ type: SET_AUTH, newState });
const sendingRequest = (sending) => ({ type: SENDING_REQUEST, sending });
const setErrorMessage = (message) => ({ type: SET_ERROR_MESSAGE, message });
const forwardTo = (location) => history.push(location);

export const resetLoginErrorMsg = () => ({ type: SET_ERROR_MESSAGE, message: '' });

/**
 * @const login - This will set the appropriate reducer state (spinners etc.) and
 * log the user in, or show an error message if there is a problem.
 */
export const login = (username, password) => (dispatch) => {
  dispatch(sendingRequest(true));

  // If no username or password was specified, throw a field-missing error
  if (anyKeyEmpty({ username, password })) {
    dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
    dispatch(sendingRequest(false));
    return;
  }

  const basicAuth = base64.encode(`${username}:${password}`);
  accessAPI(`${AUTH_URL}/auth/login`, 'POST', `Basic ${basicAuth}`, JSON.stringify({
    username,
  }), 'login').then(json => {
    dispatch(sendingRequest(false));
    dispatch(setAuthState(true));
    dispatch(setConfetti(json.showConfetti));
    dispatch(setUserState({
      username,
      role: json.role,
      accessToken: json.accessToken,
    }));
    sessionStorage.setItem('accessToken', json.accessToken);
    sessionStorage.setItem('username', username);
    forwardTo('/Home');
  }).catch(() => {
    dispatch(sendingRequest(false));
    dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
  });
};

/**
 * @const checkAuth - On a refresh, this method is called to check that the users
 * accessToken is valid, if not the user will be logged out.
 */
export const checkAuth = () => (dispatch) => {
  accessAPI(`${AUTH_URL}/auth/checkToken`, 'POST', sessionStorage.accessToken, {}, 'checkAuth').then(json => {
    dispatch(setAuthState(true));
    if (window.location.pathname === '/') forwardTo('/Home');
    dispatch(setUserState({
      username: json.username,
      accessToken: json.accessToken,
      role: json.role,
    }));
    sessionStorage.setItem('accessToken', json.accessToken);
  }).catch(() => {
    sessionStorage.clear();
    forwardTo('/');
  });
};

/**
 * @const logout - Log the user out and clear sessionStorage
 */
export const logout = () => (dispatch) => {
  dispatch(sendingRequest(true));
  accessAPI(`${AUTH_URL}/auth/logout`, 'POST', sessionStorage.accessToken, {}, 'logout').then(() => {
    dispatch(setAuthState(false));
    sessionStorage.clear();
    forwardTo('/');
    // This needs to go at the end, or else if we logout whilst on a page
    // that uses the redux store, an error will occur before the user
    // is redirected to '/'.
    dispatch(resetState(undefined));
  }).catch(() => {
    dispatch(setAuthState(false));
    dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
    sessionStorage.clear();
    forwardTo('/');
    dispatch(resetState(undefined));
  });
};
