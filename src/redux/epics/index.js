import { combineEpics } from 'redux-observable';

import appEpics from "./global/appEpics";
import userEpics from "./global/userEpics";

import dashboardEpics from "./pages/dashboardEpics";
import balanceEpics from "./pages/balanceEpics";
import balanceMutationEpic from "./pages/balanceMutationEpic";
import newsDetailEpic from "./pages/newsDetailEpics";

let epics_arr = [
  ...appEpics,
  ...userEpics,

  ...dashboardEpics,
  ...balanceEpics,
  ...balanceMutationEpic,
  ...newsDetailEpic
];



export default combineEpics.apply( null, epics_arr );
