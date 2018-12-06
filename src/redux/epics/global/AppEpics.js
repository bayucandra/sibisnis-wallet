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
      data: Object.assign( {}, biqConfig.api.data_auth )
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

export default [
  logout
];