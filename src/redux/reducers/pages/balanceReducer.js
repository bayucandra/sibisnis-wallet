import ActionTypes from "../../action-types";

let state_default = {
  nominal_value: null,
  payment_method: null,//bank-transfer, atm, credit-card, indomaret, klik-bca,  bca-klikpay, mandiri-clickpay, cimb-clicks
  payment_info_is_visible_mobile: false,

  payment_bank_submit: {
    is_submitting: false,
    is_submitted: false,
    data: []
  },

  payment_transaction: {
    is_fetching: false,
    is_fetched: false,
    data: []
  }

};

export default ( state = state_default, action ) => {

  let new_state = {};

  switch ( action.type ) {

    case ActionTypes.balance.NOMINAL_SET:
      new_state = { nominal_value: action.payload };
      return Object.assign( {}, state, new_state );

    case ActionTypes.balance.PAYMENT_METHOD_SET:
      new_state = { payment_method: action.payload };
      return Object.assign( {}, state, new_state );

    case ActionTypes.balance.PAYMENT_METHOD_RESET:
      new_state = {payment_method: null};
      return Object.assign( {}, state, new_state );

    case ActionTypes.balance.PAYMENT_INFO_VISIBILITY:
      new_state = { payment_info_is_visible_mobile: !state.payment_info_is_visible_mobile };
      return Object.assign( {}, state, new_state );


    case ActionTypes.balance.PAYMENT_TRANSACTION_FETCH:
      new_state = {
        payment_transaction : Object.assign( {}, state_default.payment_transaction, { is_fetching: true, is_fetched: false } )
      };
      return Object.assign( {}, state, new_state );
    case ActionTypes.balance.PAYMENT_TRANSACTION_FETCHED:
      new_state = {
        payment_transaction : Object.assign( {}, state_default.payment_transaction, { is_fetching: false, is_fetched: true, data: action.payload } )
      };
      return Object.assign( {}, state, new_state );

    case ActionTypes.balance.PAYMENT_BANK_SUBMIT:
      new_state = { payment_bank_submit: Object.assign({}, state_default.payment_bank_submit, { is_submitting: true, is_submitted: false }) };
      return Object.assign( {}, state, new_state );
    case ActionTypes.balance.PAYMENT_BANK_SUBMITTED:
      new_state = {
        payment_bank_submit: Object.assign({}, state_default.payment_bank_submit, { is_submitting: false, is_submitted: true, data: action.payload })
      };
      return Object.assign( {}, state, new_state );

    default:
      return state;

  }

}