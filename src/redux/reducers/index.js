import { combineReducers } from 'redux';

import actionTypes from "../../redux/action-types";

import app from "./global/appReducer";
import user from './global/userReducer';

import dashboard from "./pages/dashboardReducer";
import balance from "./pages/balanceReducer";
import balanceMutation from "./pages/balanceMutationReducer";
import balanceTransfer from "./pages/balanceTransferReducer";
import loginHistory from "./pages/loginHistoryReducer";
import news from "./pages/newsReducer";
import newsDetail from "./pages/newsDetailReducer";

const appReducers = combineReducers({
  app,
  user,

  dashboard,
  balance,
  balanceMutation,
  balanceTransfer,
  loginHistory,
  news,
  newsDetail
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.app.STATES_RESET) {
    if ( process.env.NODE_ENV === 'development' ) console.warn('Resetting state===============');
    state = undefined;
  }

  return appReducers(state, action)
};

export default rootReducer;