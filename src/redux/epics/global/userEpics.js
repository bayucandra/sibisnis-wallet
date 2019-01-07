import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import { switchMap, map, takeUntil, filter, catchError } from "rxjs/operators";

import actionTypes from "redux/action-types";
import userActions from "redux/actions/global/userActions";
import biqConfig from "../../../providers/biqConfig";

const userPasswordUpdateSubmit = action$ => action$.pipe(

  ofType( actionTypes.user.PASSWORD_UPDATE_SUBMIT ),

  switchMap(
    action => {
      let ajax$ = rxAjax({
        url: `${biqConfig.api.url_base}/api/wallet/password_update`,
        method: 'POST',
        crossDomain: true,
        withCredentials: true,
        body: Object.assign( {}, action.payload.params, biqConfig.api.data_auth )
      });

      return ajax$.pipe(

        map( res => userActions.userUpdatePasswordSubmitted( res ) ),

        takeUntil( action$.pipe(
          filter( action => action.type === actionTypes.user.PASSWORD_UPDATE_CANCELED )
        ) ),

        catchError( err => of({
          type: actionTypes.user.PASSWORD_UPDATE_SUBMITTED,
          payload: { status: err.xhr.status, response: err.xhr.response }
        }) )

      );

    }
  )//switchMap()

);


export default [
  userPasswordUpdateSubmit
];
