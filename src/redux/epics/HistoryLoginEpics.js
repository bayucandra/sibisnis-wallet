import * as Types from './../../lib/actionTypes';
import * as ApiStubs from './../../lib/apiStubs';
import * as HistoryLoginActions from './../actions/HistoryLoginActions';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent} from 'rxjs';
import {  mergeMap, filter, map, mapTo,flatMap,  delay, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const getHistoryList = action$ => {

  return action$.pipe(
    ofType(Types.GET_HISTORY_LOGINS_LIST),
    mergeMap(action => {
      return from(ApiStubs.getHistory()).pipe(
        flatMap(response => {
          return [HistoryLoginActions.setHistoryLoginList(response.data)]
        }),
        catchError(err=>{
          console.log(err)
        })
      )
    })
  )
}
