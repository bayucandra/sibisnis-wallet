import actionTypes from "redux/action-types";

function newsDetailFetch( news_id ) {
  return {
    type: actionTypes.newsDetail.FETCH,
    payload: {news_id}
  }
}

function newsDetailFetched( response ) {
  return {
    type: actionTypes.newsDetail.FETCHED,
    payload: response
  }
}

function newsDetailCanceled() {
  return {
    type: actionTypes.newsDetail.CANCELED
  }
}


export default {
  newsDetailFetch,
  newsDetailFetched,
  newsDetailCanceled
};