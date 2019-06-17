import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import {switchMap, map, takeUntil, filter, catchError } from 'rxjs/operators';

import actionTypes from "../../action-types";
import biqConfig from "../../../providers/biqConfig";
import appActions from "../../actions/global/appActions";

const logout = action$ => action$.pipe(
  ofType( actionTypes.app.LOGOUT ),
  switchMap(
    action => rxAjax({
      method: 'POST',
      url: `${biqConfig.api.url_base}/api/logout`,
      crossDomain: true,
      withCredentials: true,
      body: Object.assign( {}, biqConfig.api.data_auth )
    })
      .pipe(

        map( res => appActions.appLoggingOut( { status: res.status, response: res.response } ) ),

        takeUntil( action$.pipe(
          filter( action => action.type === actionTypes.app.LOGOUT_CANCELED )
        ) ),

        catchError( err => of ({
          type: actionTypes.app.LOGGED_OUT,
          payload: { status: err.xhr.status, response: err.xhr.response }
        }) )

      )
  )
);

const hostChecked = action$ => action$.pipe(
  ofType( actionTypes.app.HOST_CHECK ),
  switchMap(
    action => rxAjax({
      method: 'POST',
      url: `${biqConfig.api.url_base}/api/login/host_checked`,
      crossDomain: true,
      withCredentials: true,
      body: Object.assign({
        host: biqConfig.host,
        folder: biqConfig.folder
      }, biqConfig.api.data_auth)
    })
      .pipe(
        map( res => appActions.appHostChecked({ status: res.status, response: res.response }) ),
        catchError(err => of({
          type: actionTypes.app.HOST_CHECKED,
          payload: { status: err.xhr.status, response: err.xhr.response }
        }))
      )
  )
);

export default [
  logout,
  hostChecked
];
