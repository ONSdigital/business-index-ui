import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import history from './history';
import reducer from './reducers/index';
import Home from './views/Home';
import Results from './views/Results';
import NotFound from './views/NotFound';
import Template from './templates/Template';
import Login from './views/Login';
import withSearch from './components/SearchHOC';
import PrivateRoute from './components/PrivateRoute';

// Create the Redux store with the redux-thunk middleware (for async actions)
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// Create the store, adding in the start command for redux developer tools
const store = createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const a = () => {
  const loggedIn = store.getState().login.loggedIn;
  console.log('calling a: ', loggedIn);
  return loggedIn;
};

const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Template>
          <Switch>
            <Route exact path="/" component={Login} />
            {/* <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} /> */}
            {/* <Route exact path="/Home" component={withSearch(Home)} /> */}
            <PrivateRoute authed={a} exact path="/Home" component={withSearch(Home)} />
            <Route exact path="/Results" component={withSearch(Results)} />
            <Route component={NotFound} />
          </Switch>
        </Template>
      </div>
    </Router>
  </Provider>
);

export default Routes;
