"use strict"
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import logger from 'redux-logger';

import Main from './main';
import BookList from './containers/bookList';
import Cart from './containers/cart';
import BooksForm from './containers/booksForm';
import Auth from './containers/auth';
import Signout from './containers/signout';
import RequireAuth from './components/hoc/require_auth'
import reducers from './store/reducers';
import { AUTH_USER } from './store/auth/actionTypes'


const store = createStore(combineReducers(reducers), composeWithDevTools(
  applyMiddleware(thunk, logger)
));

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={BookList} />
        <Route path='/admin' component={RequireAuth(BooksForm)} />
        <Route path='/cart' component={Cart} />
        <Route path='/auth' component={Auth} />
        <Route path='/signout' component={Signout} />
      </Route>
    </Router>
  </Provider>
)

render(
  Routes, document.getElementById('app')
);
