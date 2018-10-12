import ActionTypes from '../action-types';
import biqHelper from "../../lib/biqHelper";
import biqConfig from "../../lib/biqConfig";

export const getUser = () => {
  return {
    type: ActionTypes.user.GET,
    payload: null
  };
};

export const setUser = (userData) => {
  return {
    type: ActionTypes.user.SET,
    payload: userData
  };
};

// Only for stub purpose
export const getUserWithUpdatedProfile = (profileImage) => {
  return {
    type: ActionTypes.user.IMAGE_GET,
    payload: profileImage
  }
};