import actionTypes from "redux/action-types";

function dashboardEmailVerificationSubmit() {
  return {
    type: actionTypes.dashboard.EMAIL_VERIFICATION_SUBMIT
  }
}

function dashboardEmailVerificationSubmitted( data ) {
  return {
    type: actionTypes.dashboard.EMAIL_VERIFICATION_SUBMITTED,
    payload: data
  }
}

function dashboardEmailVerificationReset() {
  return {
    type: actionTypes.dashboard.EMAIL_VERIFICATION_RESET
  }
}

export default {
  dashboardEmailVerificationSubmit,
  dashboardEmailVerificationSubmitted,
  dashboardEmailVerificationReset
}