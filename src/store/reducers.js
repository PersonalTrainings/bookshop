"use strict"
import booksReducer from './books/reducer';
import cartReducer from './cart/reducer';
import authReducer from './auth/reducer';

export default {
  books: booksReducer,
  cart: cartReducer,
  auth: authReducer
}