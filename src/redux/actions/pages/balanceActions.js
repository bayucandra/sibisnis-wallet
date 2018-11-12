import ActionTypes from "../../action-types";

  function balanceNominalSet( nominal ) {
    return {
      type: ActionTypes.balance.NOMINAL_SET,
      payload: nominal
    }
  }

  function balanceMethodSet( method ) {
    return {
      type: ActionTypes.balance.PAYMENT_METHOD_SET,
      payload: method
    };
  }

  function balanceMethodReset() {
    return {
      type: ActionTypes.balance.PAYMENT_METHOD_RESET
    }
  }

  function balancePaymentInfoVisibility() {
    return {
      type: ActionTypes.balance.PAYMENT_INFO_VISIBILITY
    }
  }

const actions = {
  balanceNominalSet,
  balanceMethodSet,
  balanceMethodReset,
  balancePaymentInfoVisibility
};

export default actions;