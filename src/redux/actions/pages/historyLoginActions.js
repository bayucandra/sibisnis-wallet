import * as Types from '../../../lib/actionTypes';

export const getHistoryLoginList = () => {
  return {
    type: Types.GET_HISTORY_LOGINS_LIST,
    payload: null
  };
};

export const setHistoryLoginList = (historyLoginList) => {
  return {
    type: Types.SET_HISTORY_LOGINS_LIST,
    payload: historyLoginList
  };
}