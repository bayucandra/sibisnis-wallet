import actionTypes from "redux/action-types";

const state_default = {
  mutation_list: {
    is_fetching: false,
    is_fetched: false,
    data: []
  }
};

export default ( state = state_default, action ) => {

  let new_state = {};

  switch ( action.type ) {

    case actionTypes.balanceMutation.SCROLL_PAGINATION_FETCH:
      new_state = { mutation_list: Object.assign( {}, state_default.mutation_list, { is_fetching: true, data: state.mutation_list.data } ) };
      break;

    case actionTypes.balanceMutation.SCROLL_PAGINATION_FETCHED:
      new_state = { mutation_list: Object.assign( {}, state_default.mutation_list, { is_fetched: true, data: action.payload.data } ) };
      break;

    case actionTypes.balanceMutation.SCROLL_PAGINATION_RESET:
      new_state = { mutation_list: Object.assign( {}, state_default.mutation_list ) }
      break;

    default:
      return state;

  }

  return Object.assign( {}, state, new_state );

}