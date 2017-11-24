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
import BookList from './components/pages/bookList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import reducers from './store/reducers';


const store = createStore(combineReducers(reducers), composeWithDevTools(
  applyMiddleware(thunk, logger)
));

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={BookList} />
        <Route path='/admin' component={BooksForm} />
        <Route path='/cart' component={Cart} />
      </Route>
    </Router>
  </Provider>
)

render(
  Routes, document.getElementById('app')
);
