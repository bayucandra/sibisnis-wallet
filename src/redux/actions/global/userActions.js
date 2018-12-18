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

export default {
  userProfileGet,
  userProfileUpdate
};