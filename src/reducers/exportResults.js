import { FORMING_CSV, FORMING_JSON, SET_CSV_ERROR_MESSAGE, SET_JSON_ERROR_MESSAGE } from '../constants/ExportConstants';

const initialState = {
  formingCsv: false,
  formingJson: false,
  csvErrorMessage: '',
  jsonErrorMessage: '',
};

/**
 * @const exportReducer - The reducer to the exporting of results to CSV/JSON
 *
 * @param {Object} state - This current reducer state
 * @param {Object} action - An action which holds the type and any data
 *
 * @return {Object} - The new state (after the action has been applied)
 */
const exportReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORMING_CSV:
      return Object.assign({}, state, {
        ...state,
        formingCsv: action.sending,
      });
    case FORMING_JSON:
      return Object.assign({}, state, {
        ...state,
        formingJson: action.sending,
      });
    case SET_CSV_ERROR_MESSAGE:
      return Object.assign({}, state, {
        ...state,
        csvErrorMessage: action.message,
      });
    case SET_JSON_ERROR_MESSAGE:
      return Object.assign({}, state, {
        ...state,
        jsonErrorMessage: action.message,
      });
    default:
      return state;
  }
};

export default exportReducer;
