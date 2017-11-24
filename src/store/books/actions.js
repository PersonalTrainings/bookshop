"use strict"
import axios from 'axios';
import * as types from './actionTypes';

export function getBooks() {
  return dispatch => {
    axios.get('/api/books')
      .then(response => dispatch({ type: types.GET_BOOKS, payload: response.data }))
      .catch(err => dispatch({ type: types.GET_BOOK_REJECTED, payload: err }))
  }
}

export function postBooks(book) {
  return dispatch => {
    axios.post('/api/books', book)
      .then(response => dispatch({ type: types.POST_BOOK, payload: response.data }))
      .catch(err => dispatch({ type: types.POST_BOOK_REJECTED, payload: err }))
  }
}

export function deleteBooks(id) {
  return dispatch => {
    axios.delete(`/api/books/${id}`)
      .then(response => dispatch({ type: types.DELETE_BOOK, payload: id }))
      .catch(err => dispatch({ type: types.DELETE_BOOK_REJECTED, payload: err }))
  }
}

export function resetButton() {
  return { type: types.RESET_BUTTON }
}