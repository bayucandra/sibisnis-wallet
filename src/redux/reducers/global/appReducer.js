import actionTypes from "../../action-types";
import biqHelper from "../../../lib/biqHelper";
// import biqConfig from "../../providers/biqConfig";
import esProvider from "../../../providers/esProvider";

import $ from 'jquery';

let window_el = $(window);
let state_default = {
  is_app_initialized: false
  , is_es_initialized: false
  , is_logging_out: false
  , logout_response: {}
  , is_logged_in: false
  , should_redirect_to_agen: false
  , header_mobile_show: true
  , header_menu_mobile_show: true
  , loading_indicator_show: false
  , window_size: { width: window_el.outerWidth(), height: window_el.outerHeight() }
};

export default ( state = state_default, action ) => {
  let new_state = {};

  switch ( action.type ) {

    case actionTypes.app.INIT:
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
      break;

    case actionTypes.app.SSE_AGEN_INIT:
      new_state = { is_es_initialized: false };
      if ( biqHelper.utils.isNull( esProvider.state.es ) ) {
        try {
          esProvider.init();
          new_state.is_es_initialized = true;
        } catch(e) {
          new_state.is_es_initialized = false;
          console.error( 'ERROR::actionTypes.app.SSE_AGEN_INIT: ' + e.message );
        }
      }
      break;

    case actionTypes.app.ROUTER_CHANGE:
      //payload key should match to the state_default key
      new_state = action.payload;
      break;

    case actionTypes.app.LOGOUT:
      new_state = { is_logging_out: true };
      break;

    case actionTypes.app.LOGGING_OUT:
      new_state = {logout_response: action.payload};
      break;

    case actionTypes.app.LOGGED_OUT:
      new_state = { is_logged_in: false, is_logging_out: false };
      break;

    case actionTypes.app.WINDOW_RESIZE:
      new_state = { window_size: action.payload };
      break;

    case actionTypes.app.LOADING_INDICATOR_SHOW:
      new_state = { loading_indicator_show: true };
      break;

    case actionTypes.app.LOADING_INDICATOR_HIDE:
      new_state = { loading_indicator_show: false };
      break;

    case actionTypes.app.REDIRECT_TO_AGEN:
      new_state = { should_redirect_to_agen: true };
      break;

    default:
      return state;

  }//switch

  return Object.assign( {}, state, new_state );

};