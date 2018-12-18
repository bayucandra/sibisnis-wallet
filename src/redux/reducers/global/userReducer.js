import actionTypes from '../../action-types/index';
import biqHelper from "../../../lib/biqHelper/index";

const initialState = {
  is_profile_parsed: false,
  profile: {}
};

export default (state = initialState, action = {}) => {
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

    default:
      return state;
  }

  return Object.assign({}, state, new_state);

}