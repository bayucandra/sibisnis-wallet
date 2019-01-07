import actionTypes from 'redux/action-types/index';
import biqHelper from "lib/biqHelper/index";

const state_default = {
  is_profile_parsed: false,
  profile: {},

  password_update: {
    is_submitting: false,
    is_submitted: false,
    server_response: {}
  }
};

export default (state = state_default, action = {}) => {
  let new_state = {};

  switch (action.type) {

    case actionTypes.user.PROFILE_GET:
      new_state = { is_profile_parsed: true, profile: action.payload };
      // new_state.profile.photo = null;
      break;

    case actionTypes.user.PROFILE_UPDATE:
      new_state = {
        profile: Object.assign( {}, state.profile, action.payload )
      };

      biqHelper.localStorage.set( 'user_data', new_state.profile );
      break;


    case actionTypes.user.PASSWORD_UPDATE_SUBMIT:
      new_state = {
        password_update: Object.assign( {}, state_default.password_update, { is_submitting: true } )
      };
      break;
    case actionTypes.user.PASSWORD_UPDATE_SUBMITTED:
      new_state = {
        password_update: Object.assign( {}, state_default.password_update, { is_submitted: true, server_response: action.payload } )
      };
      break;

    default:
      return state;
  }

  return Object.assign({}, state, new_state);

}