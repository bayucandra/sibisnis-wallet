import * as Types from './../../lib/actionTypes';

const initialState = {
  user: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SET_USER:
      return { ...state, user: action.payload }
    default:
      return state;
  }
}