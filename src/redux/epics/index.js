import { combineEpics } from 'redux-observable';

import appEpics from "./global/appEpics";
import dashboardEpics from "./pages/dashboardEpics";

import balanceEpics from "./pages/balanceEpics";

let epics_arr = [
  ...appEpics,
  ...balanceEpics,
  ...dashboardEpics
];



export default combineEpics.apply( null, epics_arr );
