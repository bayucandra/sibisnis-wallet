import actionTypes from "redux/action-types";

function loginHistoryFetch() {
  return {
    type: actionTypes.loginHistory.FETCH
  }
}

function loginHistoryFetched( data ) {
  return {
    type: actionTypes.loginHistory.FETCHED,
    payload: data
  }
}

function loginHistoryReset() {
  return {
    type: actionTypes.loginHistory.RESET
  }
}

export default {

  loginHistoryFetch,
  loginHistoryFetched,
  loginHistoryReset

}
