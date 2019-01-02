import actionTypes from "redux/action-types";

function newsFetch() {

  return {
    type: actionTypes.news.FETCH
  }

}

function newsFetched( data ) {
  return {
    type: actionTypes.news.FETCHED,
    payload: data
  }
}

function newsReset() {
  return {
    type: actionTypes.news.RESET
  }
}

export default {
  newsFetch,
  newsFetched,
  newsReset
}