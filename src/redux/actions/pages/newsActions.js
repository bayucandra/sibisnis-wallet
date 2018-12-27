import * as Types from '../../../lib/actionTypes';//TODO: Delete later

function getNewsList() {
  return {
    type: Types.GET_NEWS_LIST,
    payload: null
  };
}

function setNewsList(newsList) {
  return {
    type: Types.SET_NEWS_LIST,
    payload: newsList
  };
}

export default {
  getNewsList,
  setNewsList
}