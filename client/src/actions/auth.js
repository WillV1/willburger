import axios from 'axios';
import { setAlert } from './alert';

import { 
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_PROFILE
  } from './types';

//CHECK TOKEN AND LOAD USER
export const loadUser = () => async (dispatch, getState) => {

  //User loading

  dispatch({type: USER_LOADING});

  try {
    const response = await axios.get('/auth', tokenConfig(getState));

    dispatch({
      type: USER_LOADED,
      payload: response.data
    });
  } catch(err) {
    
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//REGISTER USER
export const register = ({username, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({username, email, password})

  try {
    const response = axios.post('/register', body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg)))
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
}

//LOGIN USER
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({email, password})

  try {

    const response = await axios.post('./auth', body, config)

    dispatch ({
      type: LOGIN_SUCCESS,
      payload: response.data
    });

    dispatch(loadUser());

  } catch(err) {

    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg)))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

//LOGOUT
export const logout = dispatch => {
  dispatch({type: CLEAR_PROFILE});
  dispatch({type: LOGOUT_SUCCESS})
}

//Set up config/headers and token
export const tokenConfig = getState => {
    //Get token from user localstorage

    const token = getState().auth.token;

    //Headers 
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
  
    //If token, add to headers
  
    if(token) {
      config.headers['x-auth-token'] = token;
    }

    return config;
}

