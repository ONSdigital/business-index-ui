import { SET_HEADERS, SET_FORMATTED_QUERY, SET_RESULTS, SET_QUERY, SET_SEARCH_ERROR_MESSAGE, SENDING_SEARCH_REQUEST } from '../constants/ApiConstants';

// Object.assign is not yet fully supported in all browsers, so fallback to a polyfill
const assign = Object.assign || require('object.assign');

const initialState = {
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

function refReducer(state = initialState, action) {
  switch (action.type) {
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
