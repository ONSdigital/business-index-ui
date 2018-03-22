import { CHECK_AUTH, SET_CONFETTI, SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE, SET_USER_DETAILS } from '../constants/LoginConstants';

const initialState = {
  username: '',
  role: '',
  currentlySending: false,
  loggedIn: false,
  errorMessage: '',
  accessToken: '',
  showConfetti: false,
};

/**
 * @const loginReducer - The reducer to handle login data
 *
 * @param {Object} state - This current reducer state
 * @param {Object} action - An action which holds the type and any data
 *
 * @return {Object} - The new state (after the action has been applied)
 */
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return Object.assign({}, state, {
        ...state,
        username: action.newState.username,
        role: action.newState.role,
        accessToken: action.newState.accessToken,
      });
    case SET_CONFETTI:
      return Object.assign({}, state, {
        ...state,
        showConfetti: action.show,
      });
    case SET_AUTH:
      return Object.assign({}, state, {
        ...state,
        loggedIn: action.newState,
      });
    case CHECK_AUTH:
      return Object.assign({}, state, {
        ...state,
        loggedIn: action.newState,
      });
    case SENDING_REQUEST:
      return Object.assign({}, state, {
        ...state,
        currentlySending: action.sending,
      });
    case SET_ERROR_MESSAGE:
      return Object.assign({}, state, {
        ...state,
        errorMessage: action.message,
      });
    default:
      return state;
  }
};

export default loginReducer;
