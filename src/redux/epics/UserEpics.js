import * as Types from './../../lib/actionTypes';
import * as ApiStubs from './../../lib/apiStubs';
import * as UserActions from './../actions/UserActions';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent} from 'rxjs';
import {  mergeMap, filter, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';

export const getUser = action$ => {
  return action$.pipe(
    ofType(Types.GET_USER),
    mergeMap(action => {
      ajax.getJSON(ApiStubs.getUserData()).pipe(
        map(response => {
          return UserActions.setUser(response.data);
        })
      )
    })
  )
}
