import { SET_PERIOD, REMOVE_LAST_ERROR, ADD_MOST_RECENT_ERROR, SET_MATCH_RESULTS, SET_MATCH_HEADERS, SENDING_MATCH_REQUEST, SET_MATCH_QUERY, SET_MATCH_ERROR_MESSAGE, SET_RANGE_RESULTS, SET_RANGE_HEADERS, SENDING_RANGE_REQUEST, SET_RANGE_QUERY, SET_RANGE_ERROR_MESSAGE, SET_UBRN_RESULTS, SET_UBRN_HEADERS, SENDING_UBRN_REQUEST, SET_UBRN_QUERY, SET_UBRN_ERROR_MESSAGE } from '../constants/ApiConstants';
import periods from '../config/periods';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
  period: periods.DEFAULT_PERIOD,
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
    case SET_MATCH_RESULTS:
      return assign({}, state, {
        ...state,
        match: {
          ...state.match,
          results: action.newState.results,
        },
      });
    case SET_RANGE_RESULTS:
      return assign({}, state, {
        ...state,
        range: {
          ...state.range,
          results: action.newState.results,
        },
      });
    case SET_UBRN_RESULTS:
      return assign({}, state, {
        ...state,
        ubrn: {
          ...state.ubrn,
          results: action.newState.results,
        },
      });
    case SET_PERIOD:
      return assign({}, state, {
        ...state,
        period: action.period,
      });
    case SET_MATCH_HEADERS:
      return assign({}, state, {
        ...state,
        match: {
          ...state.match,
          headers: action.newState.headers,
        },
      });
    case SET_RANGE_HEADERS:
      return assign({}, state, {
        ...state,
        range: {
          ...state.range,
          headers: action.newState.headers,
        },
      });
    case SET_UBRN_HEADERS:
      return assign({}, state, {
        ...state,
        ubrn: {
          ...state.ubrn,
          headers: action.newState.headers,
        },
      });
    case SENDING_MATCH_REQUEST:
      return assign({}, state, {
        ...state,
        match: {
          ...state.match,
          currentlySending: action.sending,
        },
      });
    case SENDING_RANGE_REQUEST:
      return assign({}, state, {
        ...state,
        range: {
          ...state.range,
          currentlySending: action.sending,
        },
      });
    case SENDING_UBRN_REQUEST:
      return assign({}, state, {
        ...state,
        ubrn: {
          ...state.ubrn,
          currentlySending: action.sending,
        },
      });
    case SET_MATCH_QUERY:
      return assign({}, state, {
        ...state,
        match: {
          ...state.match,
          query: action.query,
        },
      });
    case SET_RANGE_QUERY:
      return assign({}, state, {
        ...state,
        range: {
          ...state.range,
          query: action.query,
        },
      });
    case SET_UBRN_QUERY:
      return assign({}, state, {
        ...state,
        ubrn: {
          ...state.ubrn,
          query: action.query,
        },
      });
    case SET_MATCH_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        match: {
          ...state.match,
          errorMessage: action.message,
          timeStamp: action.timeStamp,
        },
      });
    case SET_RANGE_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        range: {
          ...state.range,
          errorMessage: action.message,
          timeStamp: action.timeStamp,
        },
      });
    case SET_UBRN_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        ubrn: {
          ...state.ubrn,
          errorMessage: action.message,
          timeStamp: action.timeStamp,
        },
      });
    default:
      return state;
  }
}

export default refReducer;
