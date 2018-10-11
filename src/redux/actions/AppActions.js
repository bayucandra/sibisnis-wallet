import ActionTypes from "../action-types";
import biqHelper from "../../lib/biqHelper";
import biqConfig from "../../lib/biqConfig";

const setProfileData = () => {

  let profile_data = biqHelper.localStorage.getObject( biqConfig.local_storage_key.user_data, {}, 'zonatikAgen' );

  console.log(profile_data);


};

export default {
  setProfileData
}