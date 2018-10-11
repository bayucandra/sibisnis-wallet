import ActionTypes from '../action-types';

const initialState = {
  user: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.user.SET:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}