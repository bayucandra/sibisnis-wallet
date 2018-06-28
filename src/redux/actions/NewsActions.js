import * as Types from './../../lib/actionTypes';

export const getNewsList = () => {
  return {
    type: Types.GET_NEWS_LIST,
    payload: null
  };
}

export const setNewsList = (newsList) => {
  return {
    type: Types.SET_NEWS_LIST,
    payload: newsList
  };
}