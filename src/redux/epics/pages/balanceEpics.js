import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import {switchMap, map, takeUntil, filter, catchError } from 'rxjs/operators';

import actionTypes from "../../action-types";
import balanceActions from "../../actions/pages/balanceActions";
import biqConfig from "providers/biqConfig";
import biqHelper from "../../../lib/biqHelper";

const paymentMethodFetch = action$ => action$.pipe(
  ofType(actionTypes.balance.PAYMENT_METHOD_FETCH),
  switchMap(
    action => rxAjax({
      url: `${biqConfig.api.url_base}/api/wallet/list_payment_method`,
      method: 'POST',
      crossDomain: true,
      withCredentials: true,
      body: Object.assign( {}, biqConfig.api.data_auth )
    })
      .pipe(

        map( res => balanceActions.balanceMethodFetched( { status: res.status, response: res.response } ) ),

        takeUntil( action$.pipe(
          filter( action => action.type === actionTypes.balance.PAYMENT_METHOD_FETCH_CANCELED )
        ) ),

        catchError( err => of({
          type: actionTypes.balance.PAYMENT_TRANSACTION_FETCHED,
          payload: err.xhr
        }) )

      )
  )
);

const paymentBankSubmit = action$ => action$.pipe(
    ofType(actionTypes.balance.PAYMENT_SUBMIT),
    switchMap(
      action => {
        let url = biqConfig.api.url_base;

        let payment_method = biqHelper.JSON.pathValueGet( action, 'option.method' );

        switch( payment_method ) {

          case 'manual_transfer':
            url += '/api/wallet/add';
            break;

          default:
            url += '';
            break;

        }

        let ajax$ = rxAjax({
          url: url,
          method: 'POST',
          crossDomain: true,
          withCredentials: true,
          body: Object.assign(action.payload, biqConfig.api.data_auth)
        });

        return ajax$
          .pipe(
            map(res => balanceActions.balancePaymentSubmitted({status: res.status, response: res.response})),

            takeUntil(action$.pipe(
              filter(action => action.type === actionTypes.balance.PAYMENT_CANCELED)
            )),

            catchError(err => of({
              type: actionTypes.balance.PAYMENT_SUBMITTED,
              payload: {status: err.xhr.status, response: err.xhr.response}
            }))
          )
      }

    )
  );

const paymentTransactionFetch = action$ => action$.pipe(
    ofType(actionTypes.balance.PAYMENT_TRANSACTION_FETCH),
    switchMap(
      action => rxAjax({
        url: `${biqConfig.api.url_base}/api/wallet/deposit_detail`,
        method: 'POST',
        crossDomain: true,
        withCredentials: true,
        body: Object.assign( { id: action.payload.deposit_id }, biqConfig.api.data_auth )
      })
        .pipe(

            map( res => balanceActions.balancePaymentTransactionFetched( { status: res.status, response: res.response } ) ),

            takeUntil(action$.pipe(
              filter(action => action.type === actionTypes.balance.PAYMENT_TRANSACTION_CANCELED)
            )),

            catchError( err => of ({
              type: actionTypes.balance.PAYMENT_TRANSACTION_FETCHED,
              payload: err.xhr
            }) )

        )
    )
  );

export default [
  paymentMethodFetch,
  paymentBankSubmit,
  paymentTransactionFetch
]
