import actionTypes from "../../action-types/index";

  function appInit() {
    return {
      type: actionTypes.app.INIT
    }
  }

  function appSseAgenInit() {
    return {
      type: actionTypes.app.SSE_AGEN_INIT
    }
  }

  function appRouterChange( new_route_state ) {
    return {
      type: actionTypes.app.ROUTER_CHANGE,
      payload: new_route_state
    }
  }

  function appLogout() {
    return {
      type: actionTypes.app.LOGOUT
    }
  }

  function appLoggingOut( res ) {
    return {
      type: actionTypes.app.LOGGING_OUT,
      payload: res
    }
  }

  function appLoggedOut( res ) {
    return {
      type: actionTypes.app.LOGGED_OUT
    }
  }

  /**
   * Reset all APP states after logout succeed
   */

  function appStatesReset() {
      return {
        type: actionTypes.app.STATES_RESET
      }
  }

  function appWindowResize( window_sizes ) {
    return {
      type: actionTypes.app.WINDOW_RESIZE,
      payload: window_sizes
    }
  }

  function appLoadingIndicatorShow() {
    return {
      type: actionTypes.app.LOADING_INDICATOR_SHOW
    }
  }

  function appLoadingIndicatorHide() {
    return {
      type: actionTypes.app.LOADING_INDICATOR_HIDE
    }
  }

  function appRedirectToAgen() {
    return {
      type: actionTypes.app.REDIRECT_TO_AGEN
    }
  }

  function appProfilePhotoDialogOpen( dialog_mode = 'select-dialog' ) {
    return {
      type: actionTypes.app.PROFILE_PHOTO_DIALOG_OPEN,
      payload: dialog_mode
    }
  }

  function appProfilePhotoDialogClose() {
    return {
      type: actionTypes.app.PROFILE_PHOTO_DIALOG_CLOSE
    }
  }

  const actions = {
    appInit,
    appSseAgenInit,
    appLogout,
    appLoggingOut,
    appLoggedOut,
    appRedirectToAgen,
    appStatesReset,
    appWindowResize,
    appRouterChange,
    appLoadingIndicatorShow,
    appLoadingIndicatorHide,
    appProfilePhotoDialogOpen,
    appProfilePhotoDialogClose
  };

export default actions;