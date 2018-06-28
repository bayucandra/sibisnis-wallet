import * as Types from './../../lib/actionTypes';
import * as ApiStubs from './../../lib/apiStubs';
import * as NewsActions from './../actions/NewsActions';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent} from 'rxjs';
import {  mergeMap, filter, map, mapTo,flatMap,  delay, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';

export const getNewsList = action$ => {

  return action$.pipe(
    ofType(Types.GET_NEWS_LIST),
    mergeMap(action => {
      return from(ApiStubs.getNews()).pipe(
        flatMap(response => {
          return [NewsActions.setNewsList(response.data)]
        })
      )
    })
  )
}
