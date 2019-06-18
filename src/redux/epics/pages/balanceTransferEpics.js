import { ofType } from 'redux-observable';
import {of} from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import {map, switchMap, takeUntil, filter, catchError} from 'rxjs/operators';

import actionTypes from "redux/action-types";
import balanceTransferActions from "redux/actions/pages/balanceTransferActions";

import biqConfig from "../../../providers/biqConfig";


const balanceTransferMemberInfoFetch = action$ => action$.pipe(

  ofType( actionTypes.balanceTransfer.MEMBER_INFO_FETCH ),
  switchMap(

    action => {

      let ajax$ = rxAjax({
        url: `${biqConfig.api.url_base}/api/wallet/member_info`,
        method: 'POST',
        ...biqConfig.rxAjaxOptions,
        body: Object.assign( {}, biqConfig.api.data_auth, { nomor_hp : action.payload } )
      });

      return ajax$.pipe(
        map( res => balanceTransferActions.memberInfoFetched( res ) ),

        takeUntil( action$.pipe(
          filter( action => action.type === actionTypes.balanceTransfer.MEMBER_INFO_CANCELED )
        ) ),

        catchError( err => of({
          type: actionTypes.balanceTransfer.MEMBER_INFO_FETCHED,
          payload: { status: err.xhr.status, response: err.xhr.response }
        }) )

      );

    }

  )

);

const balanceTransferNominalSubmit = action$ => action$.pipe(

  ofType( actionTypes.balanceTransfer.NOMINAL_SUBMIT ),

  switchMap(

    action => {

      let ajax$ = rxAjax({
        url: `${biqConfig.api.url_base}/api/wallet/transfer_saldo`,
        method: 'POST',
        ...biqConfig.rxAjaxOptions,
        body: Object.assign( {}, biqConfig.api.data_auth, action.payload )
      });

      return ajax$.pipe(

        map( res => balanceTransferActions.nominalSubmitted( res ) ),

        takeUntil( action$.pipe(
          filter( action => action.type === actionTypes.balanceTransfer.NOMINAL_CANCELED )
        ) ),

        catchError( err => of({
          type: actionTypes.balanceTransfer.NOMINAL_SUBMITTED,
          payload: { status: err.xhr.status, response: err.xhr.response }
        }) )

      );

    }

  )

);

export default [
  balanceTransferMemberInfoFetch,
  balanceTransferNominalSubmit
];
