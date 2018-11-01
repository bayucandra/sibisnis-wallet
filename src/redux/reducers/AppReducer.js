import ActionTypes from "../action-types";
import biqHelper from "../../lib/biqHelper";
// import biqConfig from "../../providers/biqConfig";
import esProvider from "../../providers/esProvider";

import $ from 'jquery';

let window_el = $(window);
let state_default = {
  is_app_initialized: false
  , is_es_initialized: false
  , is_logged_in: false
  , main_header_mobile_show: true
  , window_size: { width: window_el.outerWidth(), height: window_el.outerHeight() }
};

export default ( state = state_default, action ) => {
  let new_state = {};

  switch ( action.type ) {

    case ActionTypes.app.INIT:
      let is_logged_in_agen = biqHelper.localStorage.get( 'is_logged_in', false, 'zonatikAgen' );
      let is_logged_in_dealer = biqHelper.localStorage.get( 'is_logged_in', false, 'zonatikDealer' );

      let ls_prefix = is_logged_in_agen ? 'zonatikAgen'
        : is_logged_in_dealer ? 'zonatikDealer' : '';

      if ( !biqHelper.utils.isNull( ls_prefix ) ) {
        biqHelper.localStorage.setPrefixDefault(ls_prefix);
      }

      let is_logged_in = biqHelper.localStorage.get('is_logged_in', false);//Fetch local storage again after set prefix done

      new_state = { is_app_initialized: true, is_logged_in: false };
      new_state.is_logged_in = is_logged_in === true || is_logged_in === 'true';
      return Object.assign( {}, state, new_state );

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

    case ActionTypes.app.ROUTER_CHANGE:
      //payload key should match to the state_default key
      return Object.assign({}, state, action.payload);

    case ActionTypes.app.LOGOUT:
      new_state = { is_logged_in: false };
      return Object.assign({}, state, new_state);
      //END OF: ActionTypes.app.LOGOUT

    case ActionTypes.app.WINDOW_RESIZE:
      new_state = { window_size: action.payload };
      return Object.assign( {}, state, new_state );

    default:
      return state;

  }//switch

};