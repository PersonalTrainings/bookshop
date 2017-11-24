"use strict"
import * as types from './actionTypes';

const InitialState = {
  books: []
}

export default function reduce(state = InitialState, action) {
  switch (action.type) {
    case types.GET_BOOKS:
      return { ...state, books: [...action.payload] }
      break;
    case types.POST_BOOK:
      return { ...state, books: [...state.books, ...action.payload],
      msg: 'Saved! Click to continue', style: 'success', validation: 'success' }
      break;
    case types.POST_BOOK_REJECTED:
      return {...state, msg: 'Please, try again', style: 'danger', validation: 'success'}
      break;
    case types.RESET_BUTTON:
      return {...state, msg: null, style: 'primary', validation: null}
      break;
    case types.DELETE_BOOK:
      const currentBookToDelete = [...state.books]
      const indexToDelete = currentBookToDelete.findIndex(book => book._id == action.payload)
      return {
        books: [...currentBookToDelete.slice(0, indexToDelete),
        ...currentBookToDelete.slice(indexToDelete + 1)]
      }
      break;
    case types.UPDATE_BOOK:
      const currentBookToUpdate = [...state.books]
      const indexToUpdate = currentBookToUpdate.findIndex(book => book._id === action.payload._id)
      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: action.payload.title
      }
      return {
        books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)]
      }
      break;
    default:
      return state;
  }
}