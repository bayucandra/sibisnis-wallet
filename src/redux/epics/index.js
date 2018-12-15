import { combineEpics } from 'redux-observable';

import appEpics from "./global/appEpics";
import UserEpics from "./UserEpics";
import dashboardEpics from "./pages/dashboardEpics";
import * as HistoryLoginEpics from './HistoryLoginEpics';
import * as NewsEpics from './NewsEpics';

import balanceEpics from "./pages/balanceEpics";

let epics_arr = [
  ...appEpics,
  ...balanceEpics,
  ...dashboardEpics,
  ...UserEpics,
  ...[HistoryLoginEpics.getHistoryList, NewsEpics.getNewsList]
];



export default combineEpics.apply( null, epics_arr );
