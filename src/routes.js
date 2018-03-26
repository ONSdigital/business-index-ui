import React from 'react';
// import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
// import { checkAuth } from './actions/LoginActions';
// import Home from './views/Home';
// import Results from './views/Results';
import NotFound from './views/NotFound';
import Template from './templates/Template';
import Login from './views/Login';
// import withSearch from './components/SearchHOC';

// Create the Redux store with the redux-thunk middleware (for async actions)
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// Create the store, adding in the start command for redux developer tools
const store = createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// const checkAuthentication = (nextState, replaceState) => {
//   if (sessionStorage.accessToken) {
//     store.dispatch(checkAuth());
//   } else {
//     replaceState({ pathname: '/' });
//   }
// };

// const checkLogin = () => {
//   if (sessionStorage.accessToken) store.dispatch(checkAuth());
// };

// const Routes = () => (
//   <Provider store={store}>
//     <Router history={browserHistory}>
//       <Route path="/" component={Template}>
//         <IndexRoute component={Login} onEnter={checkLogin} />
//         <Route onEnter={checkAuthentication}>
//           <Route path="/Home" component={withSearch(Home)} />
//           <Route path="/Results" component={withSearch(Results)} />
//           <Route path="/*" component={NotFound} />
//         </Route>
//       </Route>
//     </Router>
//   </Provider>
// );

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const About = () => <h1>About</h1>;
const Home = () => <h1>Home</h1>;

const Routes = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Template>
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/About" component={About} />
            <Route component={NotFound} />
          </Template>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

export default Routes;
