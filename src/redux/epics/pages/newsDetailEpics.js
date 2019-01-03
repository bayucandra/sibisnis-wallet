import {ofType} from 'redux-observable';
import {of} from 'rxjs';
import {ajax as rxAjax} from 'rxjs/ajax';
import {switchMap, map, takeUntil, filter, catchError} from "rxjs/operators";

import actionTypes from "redux/action-types";
import "redux/actions/pages/newsDetailActions";
import biqConfig from "../../../providers/biqConfig";
import newsDetailActions from "../../actions/pages/newsDetailActions";

const newsDetailFetch = action$ => action$.pipe(

  ofType( actionTypes.newsDetail.FETCH ),

  switchMap(

    action => {

      let ajax$ = rxAjax({
        url: `${biqConfig.api.url_base}/api/wallet/detail_berita?id=${action.payload.news_id}`,
        method: 'GET',
        crossDomain: true,
        withCredentials: true
      });

      return ajax$.pipe(

        map( res => newsDetailActions.newsDetailFetched( res ) ),

        takeUntil( action$.pipe(
          filter( action => action.type === actionTypes.newsDetail.CANCELED )
        ) ),

        catchError( err => of({
          type: actionTypes.newsDetail.FETCHED,
          payload: { status: err.xhr.status, response: err.xhr.response }
        }) )

      );

    }

  )

);

export default [
  newsDetailFetch
];
