import * as Types from './../../lib/actionTypes';

const initialState = {
  newsList: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SET_NEWS_LIST:
      return { ...state, newsList: action.payload }
    default:
      return state;
  }
}