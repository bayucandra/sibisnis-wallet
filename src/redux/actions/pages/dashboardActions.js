import actionTypes from "redux/action-types";

function dashboardEmailVerificationSubmit() {
  return {
    type: actionTypes.dashboard.EMAIL_VERIFICATION_SUBMIT
  }
}

function dashboardEmailVerificationSubmitted( response ) {
  return {
    type: actionTypes.dashboard.EMAIL_VERIFICATION_SUBMITTED,
    payload: response
  }
}

function dashboardEmailVerificationReset() {
  return {
    type: actionTypes.dashboard.EMAIL_VERIFICATION_RESET
  }
}

function dashboardPanelMobileVisibility( is_visible = null) {

  return {
    type: actionTypes.dashboard.PANEL_MOBILE_VISIBILITY,
    payload: is_visible
  }

}

function dashboardLoginHistoryFetch( data ) {
  return {
    type: actionTypes.dashboard.LOGIN_HISTORY_FETCH,
    payload: data
  }
}
function dashboardLoginHistoryFetched( response ) {
  return {
    type: actionTypes.dashboard.LOGIN_HISTORY_FETCHED,
    payload: response
  }
}
function dashboardLoginHistoryCanceled() {
  return {
    type: actionTypes.dashboard.LOGIN_HISTORY_CANCELED
  }
}

export default {
  dashboardEmailVerificationSubmit,
  dashboardEmailVerificationSubmitted,
  dashboardEmailVerificationReset,
  dashboardPanelMobileVisibility,
  dashboardLoginHistoryFetch,
  dashboardLoginHistoryFetched,
  dashboardLoginHistoryCanceled
}