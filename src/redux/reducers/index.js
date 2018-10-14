import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux'//TODO: Consider to uninstall later

import ActionTypes from "../../redux/action-types";

import app from './AppReducer';
import user from './UserReducer';
import historyLogin from './HistoryLoginReducer';
import news from './NewsReducers';


const appReducers = combineReducers({
  app,
  user,
  historyLogin,
  news
});

const rootReducer = (state, action) => {
  if (action.type === ActionTypes.app.STATES_RESET) {
    state = undefined
  }

  return appReducers(state, action)
};

export default rootReducer;