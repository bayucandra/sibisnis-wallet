import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux'//TODO: Consider to uninstall later

import ActionTypes from "../../redux/action-types";

import app from './global/appReducer';
import user from './global/userReducer';

import historyLogin from './pages/historyLoginReducer';
import news from './pages/newsReducers';
import balance from './pages/balanceReducer';


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
    state = undefined;
  }

  return appReducers(state, action)
};

export default rootReducer;