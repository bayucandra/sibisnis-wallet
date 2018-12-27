import actionTypes from "redux/action-types";

let state_default = {
  email_verification: {
    is_submitting: false,
    is_submitted: false,
    response: {}
  },
  is_panel_mobile_visible : false
};

export default ( state = state_default, action ) => {


  let new_state = {};

  switch ( action.type ) {

    case actionTypes.dashboard.EMAIL_VERIFICATION_SUBMIT:
      new_state = {
        email_verification: Object.assign(
          {},
          state_default.email_verification,
          { is_submitting: true, is_submitted: false }
          )
      };
      break;

    case actionTypes.dashboard.EMAIL_VERIFICATION_SUBMITTED:
      new_state = {
        email_verification: Object.assign(
          {},
          state_default.email_verification,
          { is_submitting: false, is_submitted: true, response: action.payload } )
      };
      break;

    case actionTypes.dashboard.EMAIL_VERIFICATION_RESET:
      new_state = {
        email_verification: Object.assign( {}, state_default.email_verification )
      };
      break;

    case actionTypes.dashboard.PANEL_MOBILE_VISIBILITY:
      let value = action.payload === null ? !state.is_panel_mobile_visible : action.payload;
      new_state = {
        is_panel_mobile_visible: value
      };
      break;

    default:
      return state;

  }

  return Object.assign( {}, state, new_state )

}