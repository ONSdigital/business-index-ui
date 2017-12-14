import { SET_HEADERS, SET_FORMATTED_QUERY, SET_RESULTS, SET_QUERY, SET_SEARCH_ERROR_MESSAGE, SENDING_SEARCH_REQUEST, REMOVE_LAST_ERROR, ADD_MOST_RECENT_ERROR } from '../constants/ApiConstants';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
  errorArray: [],
  match: {
    results: [],
    headers: [],
    query: {},
    formattedQuery: '',
    currentlySending: false,
    errorMessage: '',
    timeStamp: '',
  },
  range: {
    results: [],
    headers: [],
    query: {},
    formattedQuery: '',
    currentlySending: false,
    errorMessage: '',
    timeStamp: '',
  },
  ubrn: {
    results: [],
    headers: [],
    query: {},
    currentlySending: false,
    errorMessage: '',
    timeStamp: '',
  },
};

// Takes care of changing the application state
function refReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_LAST_ERROR:
      return assign({}, state, {
        ...state,
        errorArray: state.errorArray.slice(0, state.errorArray.length - 1),
      });
    case ADD_MOST_RECENT_ERROR:
      return assign({}, state, {
        ...state,
        errorArray: [...state.errorArray, {
          unitType: action.unitType,
          timeStamp: action.timeStamp,
          errorMessage: action.errorMessage,
        }],
      });
    case SET_RESULTS:
      return assign({}, state, {
        ...state,
        [action.jsonKey]: {
          ...state[action.jsonKey],
          results: action.results,
        },
      });
    case SET_HEADERS:
      return assign({}, state, {
        ...state,
        [action.jsonKey]: {
          ...state[action.jsonKey],
          headers: action.headers,
        },
      });
    case SENDING_SEARCH_REQUEST:
      return assign({}, state, {
        ...state,
        [action.jsonKey]: {
          ...state[action.jsonKey],
          currentlySending: action.sending,
        },
      });
    case SET_QUERY:
      return assign({}, state, {
        ...state,
        [action.jsonKey]: {
          ...state[action.jsonKey],
          query: action.query,
        },
      });
    case SET_FORMATTED_QUERY:
      return assign({}, state, {
        ...state,
        [action.jsonKey]: {
          ...state[action.jsonKey],
          formattedQuery: action.query,
        },
      });
    case SET_SEARCH_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        [action.jsonKey]: {
          ...state[action.jsonKey],
          errorMessage: action.message,
          timeStamp: action.timeStamp,
        },
      });
    default:
      return state;
  }
}

export default refReducer;
