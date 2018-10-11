import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux'//TODO: Consider to uninstall later
import UserReducer from './UserReducer';
import HistoryLoginReducer from './HistoryLoginReducer';
import NewsReducer from './NewsReducers';

export default combineReducers({
  UserReducer,
  HistoryLoginReducer,
  NewsReducer
});