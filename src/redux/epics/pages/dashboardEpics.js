import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import {switchMap, delay, map, takeUntil, filter, catchError} from 'rxjs/operators';

import actionTypes from "redux/action-types";
import dashboardActions from "redux/actions/pages/dashboardActions";

const dashboardEmailVerificationSubmit = action$ => action$.pipe(
  ofType( actionTypes.dashboard.EMAIL_VERIFICATION_SUBMIT ),
  switchMap(
    action => {
      let ajax$ = of({

        status: 200,
        response: {
          "response_code": {
            "status": 200,
            "message": "Success"
          },
          "data": {
            "header_message": "Link verifikasi email telah terkirim",
            "body_message": "Kami telah mengirim link verifikasi email ke anggriawan@sibisnis.com. Silahkan periksa inbox Anda. dan ikuti petunjuk di email tersebut."
          },
          "draw": 1544082917,
          "limit": 1,
          "offset": 0,
          "recordsTotal": 1,
          "recordsFiltered": 1
        }

      }).pipe( delay(2000) );

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