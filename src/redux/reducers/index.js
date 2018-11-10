import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux'//TODO: Consider to uninstall later

import ActionTypes from "../../redux/action-types";

import app from './Global/AppReducer';
import user from './Global/UserReducer';

import historyLogin from './Pages/HistoryLoginReducer';
import news from './Pages/NewsReducers';
import balance from './Pages/BalanceReducer';


const appReducers = combineReducers({
  app,
  user,

  historyLogin,
  news,
  balance
});

const rootReducer = (state, action) => {
  if (action.type === ActionTypes.app.STATES_RESET) {
    if ( process.env.NODE_ENV === 'development' ) console.warn('Resetting state===============');
    state = undefined
  }

  return appReducers(state, action)
};

export default rootReducer;