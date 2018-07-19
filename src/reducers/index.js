import { combineReducers } from 'redux';
import login from './login';
import apiSearch from './apiSearch';
import exportResults from './exportResults';
import { USER_LOGOUT } from '../constants/LoginConstants';

const appReducer = combineReducers({ login, apiSearch, exportResults });

/**
 * @const rootReducer - Our root redux reducer
 *
 * Passing undefined into the reducer is a way of resetting state.
 * https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
 *
 * @param {Object} state - The reducer state
 * @param {String} action - The action, e.g. 'USER_LOGOUT'
 */
const rootReducer = (state, action) => ((action.type === USER_LOGOUT)
  ? appReducer(undefined, action)
  : appReducer(state, action));

export default rootReducer;
