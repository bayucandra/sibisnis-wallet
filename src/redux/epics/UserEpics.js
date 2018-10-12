import ActionTypes from '../action-types';
import * as ApiStubs from './../../lib/apiStubs';
import * as UserActions from './../actions/UserActions';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent} from 'rxjs';
import {  mergeMap, filter, map, mapTo,flatMap,  delay, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';

const getUser = action$ => {
  return action$.pipe(
    ofType(ActionTypes.user.GET),
    mergeMap(action => {
      return from(ApiStubs.getUserData()).pipe(
        flatMap(response => {
          return [UserActions.setUser(response.data)]
        })
      )
    })
  )
};

// Only for stub purpose
const updateUserProfile = action$ => {
  return action$.pipe(
    ofType(ActionTypes.user.IMAGE_GET),
    mergeMap(action => {
      let profileImage = action.payload;
      return from(ApiStubs.getUserData()).pipe(
        flatMap(response => {
          response.data.profilePicture = profileImage;
          return [UserActions.setUser(response.data)]
        })
      )
    })
  )
};

let UserEpics = [ updateUserProfile, getUser ];

export default UserEpics;
