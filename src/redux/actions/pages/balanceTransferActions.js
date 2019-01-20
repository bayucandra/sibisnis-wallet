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



function nominalSubmit( payload = { saldo_transfer: 0, member_transfer_id: '', password: '' } ) {
  return {
    type: actionTypes.balanceTransfer.NOMINAL_SUBMIT,
    payload: payload
  }
}


export default {
  memberInfoFetch,
  memberInfoFetched,
  memberInfoCanceled,
  memberInfoReset,

  nominalSubmit
}