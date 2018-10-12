import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux'//TODO: Consider to uninstall later

import app from './AppReducer';
import user from './UserReducer';
import historyLogin from './HistoryLoginReducer';
import news from './NewsReducers';

export default combineReducers({
  app,
  user,
  historyLogin,
  news
});