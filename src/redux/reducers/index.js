import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import UserReducer from './UserReducer';
import HistoryLoginReducer from './HistoryLoginReducer';
import NewsReducer from './NewsReducers';

export default combineReducers({
  UserReducer,
  HistoryLoginReducer,
  NewsReducer,
  router: routerReducer
});