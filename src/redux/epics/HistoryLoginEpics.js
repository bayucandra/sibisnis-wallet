import * as Types from './../../lib/actionTypes';
import * as ApiStubs from './../../lib/apiStubs';
import historyLoginActions from '../actions/pages/historyLoginActions';
import { from } from 'rxjs';
import {  mergeMap,flatMap,  catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const getHistoryList = action$ => {

  return action$.pipe(
    ofType(Types.GET_HISTORY_LOGINS_LIST),
    mergeMap(action => {
      return from(ApiStubs.getHistory()).pipe(
        flatMap(response => {
          return [historyLoginActions.setHistoryLoginList(response.data)]
        }),
        catchError(err=>{
          console.error(err)
        })
      )
    })
  )
}
