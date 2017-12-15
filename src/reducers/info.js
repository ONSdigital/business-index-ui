import { SET_UI_INFO, SET_API_INFO, SENDING_UI_REQUEST, SENDING_API_REQUEST, SET_UI_ERROR_MESSAGE, SET_API_ERROR_MESSAGE } from '../constants/InfoConstants';

// Object.assign is not yet fully supported in all browsers, so fallback to a polyfill
const assign = Object.assign || require('object.assign');

const initialState = {
  ui: {
    version: '',
    lastUpdate: '',
    currentlySending: false,
    errorMessage: '',
  },
  api: {
    version: '',
    lastApiUpdate: '',
    lastDataUpdate: '',
    currentlySending: false,
    errorMessage: '',
  },
};

function infoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_UI_INFO:
      return assign({}, state, {
        ...state,
        ui: {
          ...state.ui,
          version: action.newState.version,
          lastUpdate: action.newState.lastUpdate,
        },
      });
    case SET_API_INFO:
      return assign({}, state, {
        ...state,
        api: {
          ...state.api,
          version: action.newState.version,
          lastApiUpdate: action.newState.lastApiUpdate,
          lastDataUpdate: action.newState.lastDataUpdate,
        },
      });
    case SENDING_UI_REQUEST:
      return assign({}, state, {
        ...state,
        ui: {
          ...state.ui,
          currentlySending: action.sending,
        },
      });
    case SENDING_API_REQUEST:
      return assign({}, state, {
        ...state,
        api: {
          ...state.api,
          currentlySending: action.sending,
        },
      });
    case SET_UI_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        ui: {
          ...state.ui,
          errorMessage: action.message,
        },
      });
    case SET_API_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        api: {
          ...state.api,
          errorMessage: action.message,
        },
      });
    default:
      return state;
  }
}

export default infoReducer;
