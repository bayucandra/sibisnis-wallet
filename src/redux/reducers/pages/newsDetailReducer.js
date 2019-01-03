import actionTypes from "redux/action-types";

const state_default = {
  news_data: {
    is_fetching: false,
    is_fetched: false,
    server_response: {}
  }
};

export default ( state = state_default, action ) => {
  let new_state = {};

  switch( action.type ) {

    case actionTypes.newsDetail.FETCH:
      new_state = { news_data: Object.assign( {}, state_default.news_data, { is_fetching: true } ) };
      break;

    case actionTypes.newsDetail.FETCHED:
      new_state = {
        news_data: Object.assign(
        {},
          state_default.news_data,
        { is_fetched: true, server_response: action.payload }
        )
      };
      break;

    default:
      return state;

  }

  return Object.assign( {}, state, new_state );
}