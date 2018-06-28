import * as Types from './../../lib/actionTypes';

const initialState = {
  historyLoginList: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SET_HISTORY_LOGINS_LIST:
      return { ...state, historyLoginList: action.payload }
    default:
      return state;
  }
}