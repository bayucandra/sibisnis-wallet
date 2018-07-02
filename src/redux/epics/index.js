import { combineEpics } from 'redux-observable';

import * as UserEpics from './UserEpics';
import * as HistoryLoginEpics from './HistoryLoginEpics';
import * as NewsEpics from './NewsEpics';

export default combineEpics(
  UserEpics.getUser,
  UserEpics.updateUserProfile,
  HistoryLoginEpics.getHistoryList,
  NewsEpics.getNewsList
);
