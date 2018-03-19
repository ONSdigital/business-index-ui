import { combineReducers } from 'redux';
import login from './login';
import apiSearch from './apiSearch';

const appReducer = combineReducers({ login, apiSearch });

// Below is way of reseting the store on action USER_LOGOUT
// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
/* eslint no-param-reassign: off */
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
