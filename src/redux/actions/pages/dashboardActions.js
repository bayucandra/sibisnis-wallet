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

function dashboardPanelMobileVisibility( is_visible = null) {

  return {
    type: actionTypes.dashboard.PANEL_MOBILE_VISIBILITY,
    payload: is_visible
  }

}

export default {
  dashboardEmailVerificationSubmit,
  dashboardEmailVerificationSubmitted,
  dashboardEmailVerificationReset,
  dashboardPanelMobileVisibility
}