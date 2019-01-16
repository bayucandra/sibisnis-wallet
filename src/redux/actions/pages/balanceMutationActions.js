import actionTypes from "redux/action-types";

function balanceMutationfetch() {
  return {
    type: actionTypes.balanceMutation.SCROLL_PAGINATION_FETCH
  }
}

function balanceMutationfetched( data ) {
  return {
    type: actionTypes.balanceMutation.SCROLL_PAGINATION_FETCHED,
    payload: data
  }
}

/*
function balanceMutationReset() {
  return {
    type: actionTypes.balanceMutation.SCROLL_PAGINATION_RESET
  }
}
*/



function balanceMutationNumberPaginationFetch( payload ) {//{ limit: number, offset: number }
  return {
    type: actionTypes.balanceMutation.NUMBER_PAGINATION_FETCH,
    payload
  }
}

function balanceMutationNumberPaginationFetched( response ) {
  return {
    type: actionTypes.balanceMutation.NUMBER_PAGINATION_FETCHED,
    payload: response
  }
}


export default {

  balanceMutationfetch,
  balanceMutationfetched,
  // balanceMutationReset

  balanceMutationNumberPaginationFetch,
  balanceMutationNumberPaginationFetched

}