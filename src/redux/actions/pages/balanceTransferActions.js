import actionTypes from "redux/action-types";

function memberInfoFetch( phone_number ) {
  return {
    type: actionTypes.balanceTransfer.MEMBER_INFO_FETCH,
    payload: phone_number
  }
}

function memberInfoFetched( response ) {

  return {
    type: actionTypes.balanceTransfer.MEMBER_INFO_FETCHED,
    payload: response
  }

}

function memberInfoCanceled() {
  return {
    type: actionTypes.balanceTransfer.MEMBER_INFO_CANCELED
  }
}

function memberInfoReset() {
  return {
    type: actionTypes.balanceTransfer.MEMBER_INFO_RESET
  }
}

export default {
  memberInfoFetch,
  memberInfoFetched,
  memberInfoCanceled,
  memberInfoReset
}