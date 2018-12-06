import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import {switchMap, map, takeUntil, filter, catchError } from 'rxjs/operators';

import actionTypes from "../../action-types";
import balanceActions from "../../actions/pages/balanceActions";
import biqConfig from "../../../providers/biqConfig";

const paymentBankSubmit = action$ => action$.pipe(
    ofType(actionTypes.balance.PAYMENT_BANK_SUBMIT),
    switchMap(
      action => rxAjax({
        url: `${biqConfig.api.url_base}/api/wallet/add`,
        method: 'POST',
        crossDomain: true,
        withCredentials: true,
        body: Object.assign( action.payload, biqConfig.api.data_auth )
      })
        .pipe(

          map( res => balanceActions.balancePaymentBankSubmitted( { status: res.status, response: res.response } )),

          takeUntil( action$.pipe(
            filter( action => action.type === actionTypes.balance.PAYMENT_BANK_CANCELED )
          ) ),

          catchError( err => of ({
            type: actionTypes.balance.PAYMENT_BANK_SUBMITTED,
            payload: { status: err.xhr.status, response: err.xhr.response }
          }) )

        )
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
  paymentBankSubmit,
  paymentTransactionFetch
]
