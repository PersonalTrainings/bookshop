"use strict"
import booksReducer from './books/reducer';
import cartReducer from './cart/reducer';

export default {
  books: booksReducer,
  cart: cartReducer
}