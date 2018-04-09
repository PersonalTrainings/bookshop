import * as types from './actionTypes'
import axios from 'axios';
import { browserHistory } from 'react-router';

export const signup = ({email, password}) => {
  return dispatch => {
    dispatch({ type: types.SIGN_UP_REQUEST })
    axios.post('/api/signup', { email, password })
      .then(response => {
        dispatch({ type: types.AUTH_USER })
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch((error) => dispatch(authError(error.response.data.error)));
  }
}

export const signin = ({email, password}) => {
  return dispatch => {
    dispatch({ type: types.SIGN_IN_REQUEST })
    axios.post('/api/signin', { email, password })
      .then(response => {
        dispatch({ type: types.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch(error => dispatch(authError(error.response.data)));
  }
}

export const authError = error => {
  return {
    type: types.AUTH_ERROR,
    payload: error
  };
}

export const removeErrorMessage = () => {
  return dispatch => {
    dispatch({ type: types.REMOVE_ERROR_MESSAGE })
  }
}

export const signout = () => {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch({type: types.UNAUTH_USER})
  }
}