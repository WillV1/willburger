import axios from 'axios';
import { returnErrors } from './error';

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

//Check token and load user
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
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR
    });
  }
};

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