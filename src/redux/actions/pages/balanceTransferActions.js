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



function nominalSubmit( payload = { saldo_transfer: 0, member_transfer_id: '', password: '', keterangan: '' } ) {
  return {
    type: actionTypes.balanceTransfer.NOMINAL_SUBMIT,
    payload: payload
  }
}

function nominalSubmitted( response ) {

  return {
    type: actionTypes.balanceTransfer.NOMINAL_SUBMITTED,
    payload: response
  }

}

function nominalCanceled() {
  return {
    type: actionTypes.balanceTransfer.NOMINAL_CANCELED
  }
}


export default {
  memberInfoFetch,
  memberInfoFetched,
  memberInfoCanceled,
  memberInfoReset,

  nominalSubmit,
  nominalSubmitted,
  nominalCanceled
}