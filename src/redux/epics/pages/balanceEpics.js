import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import {switchMap, map, takeUntil, filter, catchError } from 'rxjs/operators';

import actionTypes from "../../action-types";
import balanceActions from "../../actions/pages/balanceActions";
import biqConfig from "../../../providers/biqConfig";

/*const paymentSubmitAjax = () => of({
  "response_code": { "status": 200, "message": '' },
  "data": {
    "memberid": "ZON33693136",
    "tanggal": "2018-08-16 13:49:41",
    "nominal": "10000",
    "bank": "bank-tf-mandiri",
    "status": '1',
    "lst_nominal": "0",
    "date_valid": null,
    "opr": "otomatic",
    "invoice_id": 115763,
    "nominal_origin": 10161,
    "expired": moment().add(40, 'seconds').format('YYYY-MM-DD HH:mm:ss')
  }
}).pipe(delay(2000));*/

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

/*
const paymentStatus = ( id ) => {

  if ( id === 1 ) {

    return of({
      "response_code": {"status": 200, "message": ''},
      "data": {
        "memberid": "ZON33693136",
        "tanggal": "2018-08-16 13:49:41",
        "nominal": "10000",
        "bank": "bank-tf-mandiri",
        "status": '3',
        "lst_nominal": "0",
        "date_valid": null,
        "opr": "otomatic",
        "invoice_id": 115763,
        "nominal_origin": 10161,
        "expired": moment().subtract(3, 'minutes').format('YYYY-MM-DD HH:mm:ss')
      }

    }).pipe(delay(2000));

  }

};*/

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

const topUpHistoryFetch = action$ => action$.pipe(
  ofType( actionTypes.balance.TOP_UP_HISTORY_FETCH ),
  switchMap(
    action => rxAjax({
      url: `${biqConfig.api.url_base}/api/wallet/list_deposit`,
      method: 'POST',
      crossDomain: true,
      withCredentials: true,
      body: Object.assign( { memberid: action.payload.memberid, limit: 10, offset: 0 }, biqConfig.api.data_auth )
    })
      .pipe(
        map( res => balanceActions.balanceTopUpHistoryFetched( { status: res.status, response: res.response } ) ),

        takeUntil( action$.pipe(
          filter( action => action.type === actionTypes.balance.TOP_UP_HISTORY_CANCELED )
        ) ),

        catchError( err => of ({
          type: actionTypes.balance.TOP_UP_HISTORY_FETCHED,
          payload: err.xhr
        }) )

      )
  )
);

export default [
  paymentBankSubmit,
  paymentTransactionFetch,
  topUpHistoryFetch
]
