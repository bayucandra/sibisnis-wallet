import actionTypes from "../../action-types/index";

  function appInit() {
    return {
      type: actionTypes.app.INIT
    }
  }

  function appHostCheck() {
    return {
      type: actionTypes.app.HOST_CHECK
    }
  }

  function appHostChecked( payload ) {
    return {
      type: actionTypes.app.HOST_CHECKED,
      payload
    }
  }

  function appSseAgenInitializing() {
    return {
      type: actionTypes.app.SSE_AGEN_INITIALIZING
    }
  }

  function appSseAgenInitialized( payload = { initialized: true, error: false } ) {
    return {
      type: actionTypes.app.SSE_AGEN_INITIALIZED,
      payload
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
      type: actionTypes.app.SWITCH_PLATFORM
    }
  }

  function appDialogProfilePhotoOpen( dialog_mode = 'select-dialog' ) {
    return {
      type: actionTypes.app.DIALOG_PROFILE_PHOTO_OPEN,
      payload: dialog_mode
    }
  }
  function appDialogProfilePhotoClose() {
    return { type: actionTypes.app.DIALOG_PROFILE_PHOTO_CLOSE }
  }

  function appDialogAddressOpen() {
    return { type: actionTypes.app.DIALOG_ADDRESS_INPUT_OPEN }
  }
  function appDialogAddressClose() {
    return { type: actionTypes.app.DIALOG_ADDRESS_INPUT_CLOSE }
  }

  function appDialogEmailOpen() {
    return { type: actionTypes.app.DIALOG_EMAIL_INPUT_OPEN }
  }
  function appDialogEmailClose() {
    return { type: actionTypes.app.DIALOG_EMAIL_INPUT_CLOSE }
  }

  function appDialogNoticeOpen( content_obj ) {
    return {
      type: actionTypes.app.DIALOG_NOTICE_OPEN,
      payload: content_obj
    }
  }
  function appDialogNoticeClose() {
    return { type: actionTypes.app.DIALOG_NOTICE_CLOSE }
  }
  
  

  const actions = {
    appInit,
    appHostCheck,
    appHostChecked,
    appSseAgenInitializing,
    appSseAgenInitialized,
    appLogout,
    appLoggingOut,
    appLoggedOut,
    appRedirectToAgen,
    appStatesReset,
    appWindowResize,
    appRouterChange,
    appLoadingIndicatorShow,
    appLoadingIndicatorHide,
    appDialogProfilePhotoOpen,
    appDialogProfilePhotoClose,
    appDialogAddressOpen,
    appDialogAddressClose,
    appDialogEmailOpen,
    appDialogEmailClose,
    appDialogNoticeOpen,
    appDialogNoticeClose
  };

export default actions;
