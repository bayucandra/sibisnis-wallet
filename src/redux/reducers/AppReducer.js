import ActionTypes from "../action-types";
import biqHelper from "../../lib/biqHelper";
// import biqConfig from "../../providers/biqConfig";
import esProvider from "../../providers/esProvider";

let state_default = {
  profile: {}
  , is_app_initialized: false
  , is_es_initialized: false
  , is_logged_in: false
};

export default ( state = state_default, action ) => {
  let new_state = {};

  switch ( action.type ) {

    case ActionTypes.app.INIT:
      new_state = { is_app_initialized: true, is_logged_in: false };
      let is_logged_in = biqHelper.localStorage.get( 'is_logged_in', false, 'zonatikAgen' );
      new_state.is_logged_in = is_logged_in === true || is_logged_in === 'true';
      return Object.assign( {}, state, new_state );

    case ActionTypes.app.PROFILE_DATA_SET:
      new_state = { profile: action.payload };
      return Object.assign({}, state, new_state);//case ActionTypes.app.PROFILE_DATA_SET:

    case ActionTypes.app.SSE_AGEN_INIT:
      new_state = { is_es_initialized: false };
      if ( biqHelper.utils.isNull( esProvider.state.es ) ) {
        try {
          esProvider.init();
          new_state.is_es_initialized = true;
        } catch(e) {
          new_state.is_es_initialized = false;
          console.error( 'ERROR::ActionTypes.app.SSE_AGEN_INIT: ' + e.message );
        }
      }
      return Object.assign({}, state, new_state);
      //END OF: case ActionTypes.app.SSE_AGEN_INIT

    case ActionTypes.app.LOGOUT:
      new_state = { is_logged_in: false };
      return Object.assign({}, state, new_state);
      //END OF: ActionTypes.app.LOGOUT


    default:
      return state;

  }//switch

};