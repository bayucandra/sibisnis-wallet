import { combineEpics } from 'redux-observable';

import UserEpics from './UserEpics';
import * as HistoryLoginEpics from './HistoryLoginEpics';
import * as NewsEpics from './NewsEpics';

import balanceEpics from "./pages/balanceEpics";

let epics_arr = [
  ...UserEpics,
  ...[HistoryLoginEpics.getHistoryList, NewsEpics.getNewsList],
  ...balanceEpics
];



export default combineEpics.apply( null, epics_arr );
