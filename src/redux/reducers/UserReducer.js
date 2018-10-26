import ActionTypes from '../action-types';
import biqHelper from "../../lib/biqHelper";

const initialState = {
  profile: {}
};

export default (state = initialState, action = {}) => {
  let new_state = {};

  switch (action.type) {

    case ActionTypes.user.PROFILE_GET:
      new_state = { profile: action.payload };
      // new_state.profile.photo = null;
      return Object.assign({}, state, new_state);

    case ActionTypes.user.PROFILE_UPDATE:
      new_state = Object.assign( {}, {profile: state.profile} );
      new_state.profile[action.payload.key] = action.payload.value;
      biqHelper.localStorage.set( 'user_data', new_state.profile );
      return Object.assign({}, state, new_state);

    default:
      return state;
  }
}