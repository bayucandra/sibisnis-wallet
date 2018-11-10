import ActionTypes from "../../action-types/index";

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

  function appRouterChange( new_route_state ) {
    return {
      type: ActionTypes.app.ROUTER_CHANGE,
      payload: new_route_state
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
    appWindowResize,
    appRouterChange
  };

export default actions;