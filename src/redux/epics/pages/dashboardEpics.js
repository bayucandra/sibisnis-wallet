import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import {switchMap, map, takeUntil, filter, catchError} from 'rxjs/operators';

import actionTypes from "redux/action-types";
import dashboardActions from "redux/actions/pages/dashboardActions";
import biqConfig from "providers/biqConfig";

const dashboardEmailVerificationSubmit = action$ => action$.pipe(
  ofType( actionTypes.dashboard.EMAIL_VERIFICATION_SUBMIT ),
  switchMap(
    action => {
      let ajax$ = rxAjax({
        url: `${biqConfig.api.url_base}/api/wallet/verifikasi_email`,
        method: 'POST',
        crossDomain: true,
        withCredentials: true,
        body: Object.assign({}, biqConfig.api.data_auth)
      });

      return ajax$.pipe(

        map( res => dashboardActions.dashboardEmailVerificationSubmitted( { status: res.status, response: res.response } ) ),

        takeUntil( action$.pipe(
          filter( action => action.type === actionTypes.dashboard.EMAIL_VERIFICATION_CANCELED )
        ) ),

        catchError( err => of({
          type: actionTypes.dashboard.EMAIL_VERIFICATION_SUBMITTED,
          payload: { status: err.xhr.status, response: err.xhr.response }
        }) )

      );

    }
  )
);

export default [
  dashboardEmailVerificationSubmit
];