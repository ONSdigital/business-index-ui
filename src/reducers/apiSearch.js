import { SET_HEADERS, SET_TO_HIGHLIGHT, SET_FORMATTED_QUERY, SET_RESULTS, SET_QUERY, SET_SEARCH_ERROR_MESSAGE, SENDING_SEARCH_REQUEST } from '../constants/ApiConstants';

// Object.assign is not yet fully supported in all browsers, so fallback to a polyfill
const assign = Object.assign || require('object.assign');

const initialState = {
  match: {
    toHighlight: '',
    results: [],
    headers: [],
    query: {},
    formattedQuery: '',
    currentlySending: false,
    errorMessage: '',
  },
  range: {
    toHighlight: '',
    results: [],
    headers: [],
    query: {},
    formattedQuery: '',
    currentlySending: false,
    errorMessage: '',
  },
  ubrn: {
    toHighlight: '',
    results: [],
    headers: [],
    query: {},
    currentlySending: false,
    errorMessage: '',
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
    case SET_TO_HIGHLIGHT:
      return assign({}, state, {
        ...state,
        [action.jsonKey]: {
          ...state[action.jsonKey],
          toHighlight: action.toHighlight,
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
        },
      });
    default:
      return state;
  }
}

export default refReducer;
