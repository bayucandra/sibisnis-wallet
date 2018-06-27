import * as Types from './../../lib/actionTypes';

export const getUser = () => {
  return {
    type: Types.GET_USER,
    payload: null
  };
}

export const setUser = (userData) => {
  return {
    type: Types.SET_USER,
    payload: userData
  };
}