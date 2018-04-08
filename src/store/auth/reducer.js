import * as types from './actionTypes'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_REQUEST:
      return {...state, isLoading: true}      
    case types.SIGN_IN_REQUEST:
      return {...state, isLoading: true}
      
    case types.AUTH_USER:
      return {...state, isLoading: false, isAuthenticated: true, error: null}
    case types.UNAUTH_USER:
      return {...state, isAuthenticated: false}

    case types.AUTH_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case types.REMOVE_ERROR_MESSAGE:
      return {...state, error: null}

    default: return state;
  }
}

export default rootReducer