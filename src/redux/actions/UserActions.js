import ActionTypes from '../action-types';
import biqHelper from "../../lib/biqHelper";
import biqConfig from "../../providers/biqConfig";

function userProfileGet() {

  let profile_data = biqHelper.localStorage.getObject( biqConfig.local_storage_key.user_data, {} );

  return {
    type: ActionTypes.user.PROFILE_GET,
    payload: profile_data
  }

}

function userProfileUpdate( p_obj ) {//{ key:'', value: ''}
  return {
    type: ActionTypes.user.PROFILE_UPDATE,
    payload: p_obj
  }
}

export default {
  userProfileGet,
  userProfileUpdate
};