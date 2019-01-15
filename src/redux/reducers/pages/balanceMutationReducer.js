import actionTypes from "redux/action-types";

const state_default = {

  mutation_scroll_pagination: {
    is_fetching: false,
    is_fetched: false,
    data: []
  },

  mutation_number_pagination: {
    is_fetching: false,
    is_fetched: false,
    offset_current: 0,
    server_response: {}
  }

};

export default ( state = state_default, action ) => {

  let new_state = {};

  switch ( action.type ) {

    case actionTypes.balanceMutation.SCROLL_PAGINATION_FETCH:
      new_state = { mutation_scroll_pagination: Object.assign( {}, state_default.mutation_scroll_pagination, { is_fetching: true, data: state.mutation_scroll_pagination.data } ) };
      break;

    case actionTypes.balanceMutation.SCROLL_PAGINATION_FETCHED:
      new_state = { mutation_scroll_pagination: Object.assign( {}, state_default.mutation_scroll_pagination, { is_fetched: true, data: action.payload.data } ) };
      break;

    case actionTypes.balanceMutation.SCROLL_PAGINATION_RESET:
      new_state = { mutation_scroll_pagination: Object.assign( {}, state_default.mutation_scroll_pagination ) };
      break;



    case actionTypes.balanceMutation.NUMBER_PAGINATION_FETCH:
      new_state = { mutation_number_pagination: Object.assign( {}, state_default.mutation_number_pagination, { is_fetching: true  } ) };
      break;

    case actionTypes.balanceMutation.NUMBER_PAGINATION_FETCHED:
      new_state = {
        mutation_number_pagination: Object.assign(
          {},
            state_default.mutation_number_pagination,
          { is_fetched: true, server_response: action.payload }
          )
      };
      break;


    default:
      return state;

  }

  return Object.assign( {}, state, new_state );

}