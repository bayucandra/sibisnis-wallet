import actionTypes from "redux/action-types";

const state_default = {
  news_list: {
    is_fetching: false,
    is_fetched: false,
    data: []
  }
};

export default ( state = state_default, action ) => {

  let news_state = {};

  switch ( action.type ) {

    case actionTypes.news.FETCH:
      news_state = { news_list: Object.assign( {}, state_default.news_list, { is_fetching: true, data: state.news_list.data } ) };
      break;

    case actionTypes.news.FETCHED:
      news_state = { news_list: Object.assign( {}, state_default.news_list, { is_fetched: true, data: action.payload.data } ) };
      break;

    case actionTypes.news.RESET:
      news_state = { news_list: Object.assign( {}, state_default.news_list ) };
      break;

    default:
      return state;

  }

  return Object.assign( {}, state, news_state );

}