import actionTypes from "redux/action-types";

function loginHistoryFetch() {
  return {
    type: actionTypes.loginHistory.LOGIN_HISTORY_FETCH
  }
}

function loginHistoryFetched( data ) {
  return {
    type: actionTypes.loginHistory.LOGIN_HISTORY_FETCHED,
    payload: data
  }
}

export default {

  loginHistoryFetch,
  loginHistoryFetched

}
