import { SET_TO_HIGHLIGHT, SET_FORMATTED_QUERY, SET_RESULTS, SET_QUERY, SET_SEARCH_ERROR_MESSAGE, SENDING_SEARCH_REQUEST } from '../constants/ApiConstants';

const initialState = {
  toHighlight: '',
  results: [],
  query: {},
  formattedQuery: '',
  currentlySending: false,
  errorMessage: '',
  capped: '',
};

/**
 * @const searchReducer - The reducer to handle API search data
 *
 * @param {Object} state - This current reducer state
 * @param {Object} action - An action which holds the type and any data
 *
 * @return {Object} - The new state (after the action has been applied)
 */
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESULTS:
      return Object.assign({}, state, {
        ...state,
        results: action.results,
        capped: action.capped,
      });
    case SET_TO_HIGHLIGHT:
      return Object.assign({}, state, {
        ...state,
        toHighlight: action.toHighlight,
      });
    case SENDING_SEARCH_REQUEST:
      return Object.assign({}, state, {
        ...state,
        currentlySending: action.sending,
      });
    case SET_QUERY:
      return Object.assign({}, state, {
        ...state,
        query: action.query,
      });
    case SET_FORMATTED_QUERY:
      return Object.assign({}, state, {
        ...state,
        formattedQuery: action.query,
      });
    case SET_SEARCH_ERROR_MESSAGE:
      return Object.assign({}, state, {
        ...state,
        errorMessage: action.message,
      });
    default:
      return state;
  }
};

export default searchReducer;
