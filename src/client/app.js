import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Router from './routes';

import './styles/main.scss';

const history = createHistory();

const reducers = combineReducers(Object.assign(
  rootReducer,
  { router: routerReducer },
));

const store = compose(applyMiddleware(thunk))(createStore)(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>),
  document.getElementById('root'),
);