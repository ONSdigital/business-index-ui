import { CHECK_AUTH, SET_CONFETTI, SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE, SET_USER_DETAILS } from '../constants/LoginConstants';

// Object.assign is not yet fully supported in all browsers, so fallback to a polyfill
const assign = Object.assign || require('object.assign');

const initialState = {
  username: '',
  role: '',
  currentlySending: false,
  loggedIn: false,
  errorMessage: '',
  accessToken: '',
  showConfetti: false,
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DETAILS:
      return assign({}, state, {
        ...state,
        username: action.newState.username,
        role: action.newState.role,
        accessToken: action.newState.accessToken,
      });
    case SET_CONFETTI:
      return assign({}, state, {
        ...state,
        showConfetti: action.show,
      });
    case SET_AUTH:
      return assign({}, state, {
        ...state,
        loggedIn: action.newState,
      });
    case CHECK_AUTH:
      return assign({}, state, {
        ...state,
        loggedIn: action.newState,
      });
    case SENDING_REQUEST:
      return assign({}, state, {
        ...state,
        currentlySending: action.sending,
      });
    case SET_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        errorMessage: action.message,
      });
    default:
      return state;
  }
}

export default loginReducer;
