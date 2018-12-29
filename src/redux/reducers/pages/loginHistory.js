import actionTypes from "redux/action-types/pages/login-history";

const state_default = {

  login_history: {
    is_fetching: false,
    is_fetched: false,
    data: {}

  }

};

export default ( state = state_default, action ) => {

  let new_state = {};

  switch( action.type ) {

    case actionTypes.LOGIN_HISTORY_FETCH:
      new_state = { login_history: Object.assign({}, state_default.login_history, { is_fetching: true, data: state.login_history.data }) };
      break;
    case actionTypes.LOGIN_HISTORY_FETCHED:
      new_state = { login_history: Object.assign({}, state_default.login_history, { is_fetched: true, data: action.payload.data } ) };
      break;

    default:
      return state;

  }

  return Object.assign( {}, state, new_state );

}
