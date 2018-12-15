import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux'//TODO: Consider to uninstall later

import actionTypes from "../../redux/action-types";

import app from "./global/appReducer";
import balance from "./pages/balanceReducer";
import dashboard from "./pages/dashboardReducers";

import user from './global/userReducer';

import historyLogin from './pages/historyLoginReducer';
import news from './pages/newsReducers';


const appReducers = combineReducers({
  app,
  dashboard,
  balance,

  user,
  historyLogin,
  news
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.app.STATES_RESET) {
    if ( process.env.NODE_ENV === 'development' ) console.warn('Resetting state===============');
    state = undefined;
  }

  return appReducers(state, action)
};

export default rootReducer;