"use strict"
import axios from 'axios';
import * as types from './actionTypes';

export function getCart() {
  return dispatch => {
    axios.get('/api/cart')
      .then(response => dispatch({ type: types.GET_CART, payload: response.data }))
      .catch(err => dispatch({ type: types.GET_CART_REJECTED, msg: 'error when getting cart' }))
  }
}

export function addToCart(cart) {
  return dispatch => {
    axios.post('/api/cart', cart)
      .then(response => dispatch({ type: types.ADD_TO_CART, payload: response.data }))
      .catch(err => dispatch({ type: types.ADD_TO_CART_REJECTED, msg: 'error when adding to the cart' }))
  }
}

export function updateCart(_id, unit, cart) {
  const currentBookToUpdate = cart
  const indexToUpdate = currentBookToUpdate.findIndex(book => book._id === _id)
  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity: currentBookToUpdate[indexToUpdate].quantity + unit
  }

  let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
  ...currentBookToUpdate.slice(indexToUpdate + 1)]

  return dispatch => {
    axios.post('/api/cart', cartUpdate)
      .then(response => dispatch({ type: types.UPDATE_CART, payload: response.data }))
      .catch(err => dispatch({ type: types.UPDATE_CART_REJECTED, msg: 'error when updating the cart' }))
  }
}

export function deleteCartItem(cart) {
  return dispatch => {
    axios.post('/api/cart', cart)
      .then(response => dispatch({ type: types.DELETE_CART_ITEM, payload: response.data }))
      .catch(err => dispatch({ type: types.DELETE_CART_ITEM_REJECTED, msg: 'error when deleting an item from the cart' }))
  }
}