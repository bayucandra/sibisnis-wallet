import ActionTypes from "../action-types";

let state_default = {
  profile: {}
};

export default ( state = state_default, action ) => {

  switch ( action.type ) {

    case ActionTypes.app.SET_PROFILE_DATA:
      return Object.assign( state, action.payload );

    default:
      return state;

  }//switch

};