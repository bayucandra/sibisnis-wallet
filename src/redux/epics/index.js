import { combineEpics } from 'redux-observable';

import UserEpics from './UserEpics';
import * as HistoryLoginEpics from './HistoryLoginEpics';
import * as NewsEpics from './NewsEpics';

let epics_arr = [
  ...UserEpics,
  ...[HistoryLoginEpics.getHistoryList, NewsEpics.getNewsList]
];



export default combineEpics.apply( null, epics_arr );
