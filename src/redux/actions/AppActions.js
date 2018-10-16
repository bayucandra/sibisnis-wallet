import ActionTypes from "../action-types";
import biqHelper from "../../lib/biqHelper";
import biqConfig from "../../providers/biqConfig";

  const appInit = () => {
    return {
      type: ActionTypes.app.INIT
    }
  };

  const appSetProfileData = () => {

    let profile_data = biqHelper.localStorage.getObject( biqConfig.local_storage_key.user_data, {}, 'zonatikAgen' );

    return {
      type: ActionTypes.app.PROFILE_DATA_SET,
      payload: profile_data
    }

  };

  const appSseAgenInit = () => {
    return {
      type: ActionTypes.app.SSE_AGEN_INIT
    }
  };

  const appLogout = () => {
    return {
      type: ActionTypes.app.LOGOUT
    }
  };

  /**
   * Reset all APP states after logout succeed
   */

  const appStatesReset = () => {
      return {
        type: ActionTypes.app.STATES_RESET
      }
  };

  const appWindowResize = ( window_sizes ) => {
    return {
      type: ActionTypes.app.WINDOW_RESIZE,
      payload: window_sizes
    }
  };

  const actions = {
    appInit,
    appSetProfileData,
    appSseAgenInit,
    appLogout,
    appStatesReset,
    appWindowResize
  };

export default actions;