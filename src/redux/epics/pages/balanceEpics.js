import { ofType } from 'redux-observable';
// import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {switchMap, delay, map, takeUntil, filter } from 'rxjs/operators';
import * as moment from 'moment';

import actionTypes from "../../action-types";
import balanceActions from "../../actions/pages/balanceActions";

const paymentSubmitAjax = () => of({
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
}).pipe(delay(2000));

const paymentBankSubmit = action$ => action$.pipe(
    ofType(actionTypes.balance.PAYMENT_BANK_SUBMIT),
    switchMap(
      action => paymentSubmitAjax().pipe(
        map( response => balanceActions.balancePaymentBankSubmited( response )),
        takeUntil( action$.pipe(
          filter( action => action.type === actionTypes.balance.PAYMENT_BANK_CANCELED )
        ) )
      )
    )
  );


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

  } else if( id === 2){

    return of({
      "response_code": {"status": 200, "message": ''},
      "data": {
        "memberid": "ZON33693136",
        "tanggal": "2018-08-16 13:49:41",
        "nominal": "10000",
        "bank": "bank-tf-mandiri",
        "status": '5',
        "lst_nominal": "0",
        "date_valid": null,
        "opr": "otomatic",
        "invoice_id": 115763,
        "nominal_origin": 10161,
        "expired": moment().subtract(3, 'minutes').format('YYYY-MM-DD HH:mm:ss')
      }

    }).pipe(delay(2000));

  } else if( id === 3){

    return of({
      "response_code": {"status": 200, "message": ''},
      "data": {
        "memberid": "ZON33693136",
        "tanggal": "2018-08-16 13:49:41",
        "nominal": "10000",
        "bank": "bank-tf-mandiri",
        "status": '2',
        "lst_nominal": "0",
        "date_valid": null,
        "opr": "otomatic",
        "invoice_id": 115763,
        "nominal_origin": 10161,
        "expired": moment().subtract(3, 'minutes').format('YYYY-MM-DD HH:mm:ss')
      }

    }).pipe(delay(2000));

  } else {

    return of({
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
        "expired": moment().add(30, 'hours').format('YYYY-MM-DD HH:mm:ss')
      }

    }).pipe(delay(2000));

  }

};

const paymentTransactionFetch = action$ => action$.pipe(
    ofType(actionTypes.balance.PAYMENT_TRANSACTION_FETCH),
    switchMap(
      action => paymentStatus( action.payload ).pipe(
          map( response => balanceActions.balancePaymentTransactionFetched( response ) ),
          takeUntil(action$.pipe(
            filter(action => action.type === actionTypes.balance.PAYMENT_TRANSACTION_CANCELED)
          ))
      )
    )
  );

export default [
  paymentBankSubmit,
  paymentTransactionFetch
]
