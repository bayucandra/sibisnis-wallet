import actionTypes from "redux/action-types";

let state_default = {

  member_info: {
    is_fetching: false,
    is_fetched: false,
    server_response: {}
  },

  nominal_submit: {
    submitted_data: {},
    is_submitting: false,
    is_submitted: false,
    server_response: {}
  }

};

export default (state = state_default, action) => {

  let new_state = {};

  switch (action.type) {


    case actionTypes.balanceTransfer.MEMBER_INFO_FETCH:
      new_state = {
        member_info: Object.assign({}, state_default.member_info, {is_fetching: true})
      };
      break;

    case actionTypes.balanceTransfer.MEMBER_INFO_FETCHED:
      new_state = {
        member_info: Object.assign({}, state_default.member_info, {is_fetched: true, server_response: action.payload})
      };
      break;

    case actionTypes.balanceTransfer.MEMBER_INFO_RESET:
      new_state = {
        member_info: Object.assign({}, state_default.member_info)
      };
      break;


    case actionTypes.balanceTransfer.NOMINAL_SUBMIT:
      new_state = {
        nominal_submit: Object.assign({}, state_default.nominal_submit, {
          submitted_data: action.payload,
          is_submitting: true
        })
      };
      break;

    case actionTypes.balanceTransfer.NOMINAL_SUBMITTED:
      new_state = {
        nominal_submit: Object.assign({}, state_default.nominal_submit, {
          submitted_data: state.nominal_submit.submitted_data,
          is_submitted: true,
          server_response: action.payload
        })
      };
      break;


    default:
      return state;
  }

  return Object.assign({}, state, new_state);

}