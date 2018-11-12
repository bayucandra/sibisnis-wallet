import ActionTypes from "../../action-types";

let state_default = {
  nominal_value: null,
  payment_method: null,//bank-transfer, atm, credit-card, indomaret, klik-bca,  bca-klikpay, mandiri-clickpay, cimb-clicks
  payment_info_is_visible_mobile: false
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

    default:
      return state;

  }

}