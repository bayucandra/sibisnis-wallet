import ActionTypes from "../action-types";

  function appInit() {
    return {
      type: ActionTypes.app.INIT
    }
  }

  function appSseAgenInit() {
    return {
      type: ActionTypes.app.SSE_AGEN_INIT
    }
  }

  function appLogout() {
    return {
      type: ActionTypes.app.LOGOUT
    }
  }

  /**
   * Reset all APP states after logout succeed
   */

  function appStatesReset() {
      return {
        type: ActionTypes.app.STATES_RESET
      }
  }

  function appWindowResize( window_sizes ) {
    return {
      type: ActionTypes.app.WINDOW_RESIZE,
      payload: window_sizes
    }
  }

  const actions = {
    appInit,
    appSseAgenInit,
    appLogout,
    appStatesReset,
    appWindowResize
  };

export default actions;