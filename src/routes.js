import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Home from './views/Home';
import NotFound from './views/NotFound';
import Template from './templates/Template';
import Login from './views/Login';
import ContactUs from './views/ContactUs';
import WhatIsBi from './views/WhatIsBi';
import Accessibility from './views/Accessibility';
import UserDetails from './views/UserDetails';
import TechnicalInformation from './views/TechnicalInformation';
import reducer from './reducers/index';
import { checkAuth } from './actions/LoginActions';
import withSearch from './components/SearchHOC';
import UBRNForm from './components/UBRNForm';
import MatchForm from './components/MatchForm';
import RangeForm from './components/RangeForm';
import { search, setQuery, setResults } from './actions/ApiActions';
import { formMatchQuery, formRangeQuery, formUbrnQuery } from './utils/formQuery';
import config from './config/search';

const { MATCH, RANGE, UBRN } = config;

// import config from './config/constants';
// const a11y = require('react-a11y');
// const { ENV } = config;
// This will put react-a11y warnings in the console
// Can use the following to cause errors:
// a11y(React, { throw: true });
// if (ENV === 'Local') a11y(React);

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// We export the store because we need to access it in apiActions
export const store = createStoreWithMiddleware(
  reducer,
  /* eslint no-underscore-dangle: "off" */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// checkAuthentication checks if there is a sessionStorage token in browser
// if there the token gets checked with the node server for authentication
// if no token is present, the user gets redirected back to the login.
function checkAuthentication(nextState, replaceState) {
  if (sessionStorage.accessToken && sessionStorage.username) {
    store.dispatch(checkAuth(sessionStorage.username, sessionStorage.accessToken));
  } else {
    replaceState(null, '/');
  }
}

function checkLogin() {
  if (sessionStorage.accessToken && sessionStorage.username) {
    store.dispatch(checkAuth(sessionStorage.username, sessionStorage.accessToken));
  }
}

const ubrnActions = { search, setQuery, setResults };
const UBRNLookup = withSearch(UBRNForm, UBRN, ubrnActions, formUbrnQuery);

const matchActions = { search, setQuery, setResults };
const Match = withSearch(MatchForm, MATCH, matchActions, formMatchQuery);

const rangeActions = { search, setQuery, setResults };
const RangeQuery = withSearch(RangeForm, RANGE, rangeActions, formRangeQuery);

/* eslint arrow-body-style: "off" */
const Routes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Template}>
        <IndexRoute component={Login} onEnter={checkLogin} />
        <Route onEnter={checkAuthentication} >
          <Route path={'/Home'} component={Home} />
          <Route path={'/Match'} component={Match} />
          <Route path={'/RangeQuery'} component={RangeQuery} />
          <Route path={'/UBRNLookup'} component={UBRNLookup} />
          <Route path={'/WhatIsBi'} component={WhatIsBi} />
          <Route path={'/Accessibility'} component={Accessibility} />
          <Route path={'/ContactUs'} component={ContactUs} />
          <Route path={'/UserDetails'} component={UserDetails} />
          <Route path={'/TechnicalInformation'} component={TechnicalInformation} />
          <Route path={'/*'} component={NotFound} />
        </Route>
      </Route>
    </Router>
  </Provider>
);

export default Routes;
