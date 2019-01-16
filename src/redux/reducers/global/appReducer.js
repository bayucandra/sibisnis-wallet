import actionTypes from "redux/action-types";
import biqHelper from "lib/biqHelper";
// import biqConfig from "../../providers/biqConfig";
import esProvider from "../../../providers/esProvider";

import $ from 'jquery';

let window_el = $(window);
let state_default = {
  is_app_initialized: false
  , sse: { initializing: false, initialized: false, error: false }
  // , is_es_initialized: false
  , is_logging_out: false
  , logout_response: {}
  , is_logged_in: false
  , should_switch_platform: false
  , platform_kelompok: ''
  , header_mobile_show: true
  , header_menu_mobile_show: true
  , loading_indicator_show: false
  , window_size: { width: window_el.outerWidth(), height: window_el.outerHeight() }
  , dialog_profile_photo: {
    is_open: false
    , mode: 'select-dialog'//select-dialog || upload-dialog
  }
  , dialog_address_input: {
    is_open: false
  }
  , dialog_email_input: {
    is_open: false
  }
  , dialog_notice: {
    is_open: false,
    content: {
      title: '',
      notice: ''
    }
  }
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

    case actionTypes.app.SSE_AGEN_INITIALIZING:
      new_state = {
        sse: Object.assign( {}, state_default.sse, { initializing: true } )
      };
      break;

    case actionTypes.app.SSE_AGEN_INITIALIZED:
      new_state = {
        sse: Object.assign( {}, state_default.sse, action.payload )
      };
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

    case actionTypes.app.SWITCH_PLATFORM:
      new_state = { should_switch_platform: true };
      break;



    case actionTypes.app.DIALOG_PROFILE_PHOTO_OPEN:
      new_state = {
        dialog_profile_photo: {
          is_open: true,
          mode: action.payload
        }

      };
      break;
    case actionTypes.app.DIALOG_PROFILE_PHOTO_CLOSE:
      new_state = {
        dialog_profile_photo: Object.assign( {}, state_default.dialog_profile_photo )
      };
      break;


    case actionTypes.app.DIALOG_ADDRESS_INPUT_OPEN:
      new_state = {
        dialog_address_input: Object.assign( {}, state_default.dialog_address_input, { is_open: true } )
      };
      break;
    case actionTypes.app.DIALOG_ADDRESS_INPUT_CLOSE:
      new_state = {
        dialog_address_input: Object.assign( {}, state_default.dialog_address_input )
      };
      break;


    case actionTypes.app.DIALOG_EMAIL_INPUT_OPEN:
      new_state = {
        dialog_email_input: Object.assign( {}, state_default.dialog_email_input, { is_open: true } )
      };
      break;
    case actionTypes.app.DIALOG_EMAIL_INPUT_CLOSE:
      new_state = {
        dialog_email_input: Object.assign( {}, state_default.dialog_email_input )
      };
      break;


    case actionTypes.app.DIALOG_NOTICE_OPEN:
      new_state = {
        dialog_notice: Object.assign(

          {},

                state_default.dialog_notice,

        {
                  is_open: true,
                  content: action.payload
                }
            )
      };
      break;
    case actionTypes.app.DIALOG_NOTICE_CLOSE:
      new_state = {
        dialog_notice: Object.assign( {}, state_default.dialog_notice )
      };
      break;


    default:
      return state;

  }//switch

  return Object.assign( {}, state, new_state );

};