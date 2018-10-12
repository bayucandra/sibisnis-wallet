import ActionTypes from "../action-types";
import biqHelper from "../../lib/biqHelper";
import biqConfig from "../../lib/biqConfig";

  const setProfileData = () => {

    let profile_data = biqHelper.localStorage.getObject( biqConfig.local_storage_key.user_data, {}, 'zonatikAgen' );

    return {
      type: ActionTypes.app.SET_PROFILE_DATA,
      payload: profile_data
    }

  };

  const actions = {
    setProfileData: setProfileData
  };

export default actions;