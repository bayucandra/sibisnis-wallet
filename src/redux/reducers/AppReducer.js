import ActionTypes from "../action-types";

let state_default = {
  profile: {}
};

export default ( state = state_default, action ) => {
  switch ( action.type ) {

    case ActionTypes.app.SET_PROFILE_DATA:
      let new_state = Object.assign( state, { profile: action.payload } );
      return new_state;

    default:
      return state;

  }//switch

};