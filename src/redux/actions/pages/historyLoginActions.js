import * as Types from '../../../lib/actionTypes';

function getHistoryLoginList() {
  return {
    type: Types.GET_HISTORY_LOGINS_LIST,
    payload: null
  };
}

function setHistoryLoginList(historyLoginList) {
  return {
    type: Types.SET_HISTORY_LOGINS_LIST,
    payload: historyLoginList
  };
}

export default {
  getHistoryLoginList,
  setHistoryLoginList
}