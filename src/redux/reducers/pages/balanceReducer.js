import ActionTypes from "../../action-types";

let state_default = {
  nominal_value: null,
  payment_method_selected: null,//bank-transfer, atm, credit-card, indomaret, klik-bca,  bca-klikpay, mandiri-clickpay, cimb-clicks

  payment_methods: {
    is_fetching: false,
    is_fetched: false,
    server_response: {}
  },

  payment_info_is_visible_mobile: false,

  payment_submit: {
    is_submitting: false,
    is_submitted: false,
    server_response: {}
  },

  payment_transaction: {
    is_fetching: false,
    is_fetched: false,
    server_response: {}
  },

  top_up_history: {
    is_fetching: false,
    is_fetched: false,
    data: {}
  }

};

export default ( state = state_default, action ) => {

  let new_state = {};

  switch ( action.type ) {

    case ActionTypes.balance.NOMINAL_SET:
      new_state = { nominal_value: action.payload };
      break;

    case ActionTypes.balance.PAYMENT_METHOD_FETCH:
      new_state = {
        payment_methods: Object.assign( {}, state_default.payment_methods, { is_fetching: true, is_fetched: false } )
      };
      break;
    case ActionTypes.balance.PAYMENT_METHOD_FETCHED:
      new_state = {
        payment_methods: Object.assign( {}, state_default.payment_methods, { is_fetching: false, is_fetched: true, server_response: action.payload } )
      };
      break;

    case ActionTypes.balance.PAYMENT_METHOD_SET:
      new_state = {payment_method_selected : action.payload};
      break;

    case ActionTypes.balance.PAYMENT_METHOD_RESET:
      new_state = { payment_method_selected: null };
      break;

    case ActionTypes.balance.PAYMENT_INFO_VISIBILITY:
      new_state = { payment_info_is_visible_mobile: !state.payment_info_is_visible_mobile };
      break;




    case ActionTypes.balance.PAYMENT_TRANSACTION_FETCH:
      new_state = {
        payment_transaction : Object.assign( {}, state_default.payment_transaction, { is_fetching: true, is_fetched: false } )
      };
      break;
    case ActionTypes.balance.PAYMENT_TRANSACTION_FETCHED:
      new_state = {
        payment_transaction : Object.assign( {}, state_default.payment_transaction, { is_fetching: false, is_fetched: true, server_response: action.payload } )
      };
      break;
    case ActionTypes.balance.PAYMENT_TRANSACTION_RESET:
      new_state = {
        payment_transaction: Object.assign( {}, state_default.payment_transaction )
      };
      break;



    case ActionTypes.balance.PAYMENT_SUBMIT:
      new_state = { payment_submit: Object.assign({}, state_default.payment_submit, { is_submitting: true, is_submitted: false }) };
      break;
    case ActionTypes.balance.PAYMENT_SUBMITTED:
      new_state = {
        payment_submit: Object.assign({}, state_default.payment_submit, { is_submitting: false, is_submitted: true, server_response: action.payload })
      };
      break;
    case ActionTypes.balance.PAYMENT_RESET:
      new_state = { payment_submit: Object.assign( {}, state_default.payment_submit ) };
      break;



    case ActionTypes.balance.TOP_UP_HISTORY_FETCH:
      new_state = { top_up_history: Object.assign( {}, state_default.top_up_history, { is_fetching: true, is_fetched: false, data: state.top_up_history.data } ) };
      break;
    case ActionTypes.balance.TOP_UP_HISTORY_FETCHED:
      new_state = { top_up_history: Object.assign( {}, state_default.top_up_history, { is_fetching: false, is_fetched: true, data: action.payload.data } ) };
      break;

    case ActionTypes.balance.TOP_UP_HISTORY_RESET:
      new_state = { top_up_history: Object.assign( {}, state_default.top_up_history ) };
      break;

    default:
      return state;

  }


  return Object.assign( {}, state, new_state );

}