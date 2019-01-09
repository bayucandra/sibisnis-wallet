import actionTypes from '../../action-types/index';
import biqHelper from "../../../lib/biqHelper/index";
import biqConfig from "../../../providers/biqConfig";

function userProfileGet() {

  let profile_data = biqHelper.localStorage.getObject( biqConfig.local_storage_key.user_data, {} );

  return {
    type: actionTypes.user.PROFILE_GET,
    payload: profile_data
  }

}
function userProfileUpdate( p_obj ) {//{ key: value} ( single pair only )
  return {
    type: actionTypes.user.PROFILE_UPDATE,
    payload: p_obj
  }
}


function userUpdatePasswordSubmit( params ) {
  return {
    type: actionTypes.user.PASSWORD_UPDATE_SUBMIT,
    payload: {params}
  }
}
function userUpdatePasswordSubmitted( response ) {
  return {
    type: actionTypes.user.PASSWORD_UPDATE_SUBMITTED,
    payload: response
  }
}
function userUpdatePasswordCanceled() {
  return {
    type: actionTypes.user.PASSWORD_UPDATE_CANCELED
  }
}

function userUpdatePasswordDialogOpen() {
  return {
    type: actionTypes.user.PASSWORD_UPDATE_DIALOG_OPEN
  }
}

function userUpdatePasswordDialogClose() {
  return {
    type: actionTypes.user.PASSWORD_UPDATE_DIALOG_CLOSE
  }
}


export default {
  userProfileGet,
  userProfileUpdate,

  userUpdatePasswordSubmit,
  userUpdatePasswordSubmitted,
  userUpdatePasswordCanceled,

  userUpdatePasswordDialogOpen,
  userUpdatePasswordDialogClose

};