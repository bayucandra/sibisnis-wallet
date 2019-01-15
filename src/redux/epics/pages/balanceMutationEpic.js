import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/ajax';
import { switchMap, map, takeUntil, filter, catchError } from "rxjs/operators";

import actionTypes from "redux/action-types";
import balanceMutationActions from "redux/actions/pages/balanceMutationActions";


const balanceMutationNumberPaginationFetch = action$ => action$.pipe(

  ofType( actionTypes.balanceMutation.NUMBER_PAGINATION_FETCH ),

  switchMap(

    action => {

      let url = `http://newzonatik.com:8080/sibisnis-wallet/public/api/balance-mutation.php?limit=${action.payload.limit}&offset=${action.payload.offset}`;
      let ajax$ = rxAjax({
        url: url,
        method: 'GET',
        crossDomain: true,
        withCredentials: true
      });

      return ajax$.pipe(

        map( res => balanceMutationActions.balanceMutationNumberPaginationFetched( res ) ),

        takeUntil( action$.pipe(
          filter( action => action.type === actionTypes.balanceMutation.NUMBER_PAGINATION_CANCELED )
        ) ),

        catchError( err => of({
          type: actionTypes.balanceMutation.NUMBER_PAGINATION_FETCHED,
          payload: { status: err.xhr.status, response: err.xhr.response }
        }) )

      );

    }

  )

);

export default [
  balanceMutationNumberPaginationFetch
];