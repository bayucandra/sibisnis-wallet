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

function balanceMutationReset() {
  return {
    type: actionTypes.balanceMutation.SCROLL_PAGINATION_RESET
  }
}

export default {

  balanceMutationfetch,
  balanceMutationfetched,
  // balanceMutationReset

}