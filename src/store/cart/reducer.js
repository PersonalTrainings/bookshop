"use strict"
import * as types from './actionTypes'

const InitialState = {
  cart: []
}

export default function reduce(state = InitialState, action) {
  switch (action.type) {
    case types.GET_CART:
      return {...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break;
    case types.ADD_TO_CART:
      return {...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break;  
    case types.UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break;  
    case types.DELETE_CART_ITEM:
      return {...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty,
      }
      break;  
    default:
      return state;
  }
}

export function totals(payloadArr) {
  const totalAmount = payloadArr.map(cart => cart.price * cart.quantity)
                                .reduce((a,b) => { return a + b }, 0);

  const totalQty = payloadArr.map(qty => qty.quantity)
                             .reduce((a, b) => { return a + b }, 0);

  return { amount: totalAmount.toFixed(2), qty: totalQty}
}