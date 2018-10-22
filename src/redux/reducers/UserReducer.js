import ActionTypes from '../action-types';

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

    case ActionTypes.app.PROFILE_UPDATE:
      new_state = Object.assign( {}, {profile: state.profile} );
      new_state.profile[action.key] = action.value;
      return Object.assign({}, state, new_state);

    default:
      return state;
  }
}