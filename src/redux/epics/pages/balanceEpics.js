import {ofType} from 'redux-observable';
import {of} from 'rxjs';
import {ajax as rxAjax} from 'rxjs/ajax';
import {switchMap, map, takeUntil, filter, catchError, delay} from 'rxjs/operators';

import * as moment from 'moment';

import actionTypes from "redux/action-types";
import balanceActions from "redux/actions/pages/balanceActions";
import biqConfig from "providers/biqConfig";
import biqHelper from "lib/biqHelper";

const paymentMethodFetch = action$ => action$.pipe(
  ofType(actionTypes.balance.PAYMENT_METHOD_FETCH),
  switchMap(
    action => rxAjax({
      url: `${biqConfig.api.url_base}/api/wallet/list_payment_method`,
      method: 'POST',
      crossDomain: true,
      withCredentials: true,
      body: Object.assign({}, biqConfig.api.data_auth)
    })
      .pipe(
        map(res => balanceActions.balanceMethodFetched({status: res.status, response: res.response})),

        takeUntil(action$.pipe(
          filter(action => action.type === actionTypes.balance.PAYMENT_METHOD_FETCH_CANCELED)
        )),

        catchError(err => of({
          type: actionTypes.balance.PAYMENT_TRANSACTION_FETCHED,
          payload: err.xhr
        }))
      )
  )
);

const paymentBankSubmit = action$ => action$.pipe(
  ofType(actionTypes.balance.PAYMENT_SUBMIT),
  switchMap(
    action => {
      let url = biqConfig.api.url_base;

      let payment_method = biqHelper.JSON.pathValueGet(action, 'option.method');

      switch (payment_method) {

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

      if (payment_method === 'indomaret') {//TODO: For development purpose only, remove soon when the API is ready
        ajax$ = of({
          status: 200,
          response: {
            "response_code": {
              "status": 200,
              "message": "Success"
            },
            "data": {
              "status_code": "201",
              "status_message": "Success, cstore transaction is successful",
              "transaction_id": "dd4d7d54-bded-44ad-9576-e9b3c93f8e58",
              "order_id": "order024",
              "id_deposit": "-1",
              "gross_amount": "162500.00",
              "payment_type": "cstore",
              "transaction_time": "2018-09-13 09:55:20",
              "transaction_status": "pending",
              "payment_code": "549380811223344",
              "store": "indomaret"
            },
            "draw": 1536807321,
            "limit": 1,
            "offset": 0,
            "recordsTotal": 0,
            "recordsFiltered": 0
          }

        }).pipe(delay(2000));
      }

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
    action => {
      let ajax$ = rxAjax({
        url: `${biqConfig.api.url_base}/api/wallet/deposit_detail`,
        method: 'POST',
        crossDomain: true,
        withCredentials: true,
        body: Object.assign({id: action.payload.id_deposit}, biqConfig.api.data_auth)
      });

      if (action.payload.id_deposit === '-1') {//TODO: for development purpose only(dummy data), remove very soon
        ajax$ = of({
          status: 200,
          response: {
            "response_code": {"status": 200, "message": "Success"},
            "data": {
              "memberid": "ZON33530859",
              "tanggal": "2018-08-15 14:25:58",
              "nominal": "10000",
              "bank": "bank-tf-bri",
              "status": "1",
              "lst_nominal": "10000",
              "date_valid": null,
              "id": "1846",
              "opr": "otomatic",
              "invoice_id": "115752",
              "kode_bayar": "634771808466410",
              "nominal_origin": "10000",
              "updated_at": null,
              "payment_method_label": "Transfer BRI",
              "payment_channel": "indomaret",
              "expired_at": moment().add( 3, 'hours' ).format("YYYY-MM-DD HH:mm:ss") + '+00',// "2018-08-15 21:00:00+00",
              "invoice_number": "703180815000004"
            },
            "draw": 1544407457,
            "limit": 1,
            "offset": 0,
            "recordsTotal": 1,
            "recordsFiltered": 1
          }
        }).pipe(delay(2000));
      }

      return ajax$
        .pipe(
          map(res => balanceActions.balancePaymentTransactionFetched({status: res.status, response: res.response})),

          takeUntil(action$.pipe(
            filter(action => action.type === actionTypes.balance.PAYMENT_TRANSACTION_CANCELED)
          )),

          catchError(err => of({
            type: actionTypes.balance.PAYMENT_TRANSACTION_FETCHED,
            payload: err.xhr
          }))
        );

    }
  )
);

export default [
  paymentMethodFetch,
  paymentBankSubmit,
  paymentTransactionFetch
]
