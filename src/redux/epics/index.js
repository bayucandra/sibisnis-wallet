import { combineEpics } from 'redux-observable';

import appEpics from "./global/appEpics";

import dashboardEpics from "./pages/dashboardEpics";
import balanceEpics from "./pages/balanceEpics";
import newsDetailEpic from "./pages/newsDetailEpics";

let epics_arr = [
  ...appEpics,

  ...dashboardEpics,
  ...balanceEpics,
  ...newsDetailEpic
];



export default combineEpics.apply( null, epics_arr );
