import * as Types from './../../lib/actionTypes';
import * as ApiStubs from './../../lib/apiStubs';
import newsActions from '../actions/pages/newsActions';
import { from} from 'rxjs';
import {  mergeMap, flatMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const getNewsList = action$ => {

  return action$.pipe(
    ofType(Types.GET_NEWS_LIST),
    mergeMap(action => {
      return from(ApiStubs.getNews()).pipe(
        flatMap(response => {
          return [newsActions.setNewsList(response.data)]
        })
      )
    })
  )
}
