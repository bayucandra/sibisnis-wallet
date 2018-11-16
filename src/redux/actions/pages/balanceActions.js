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


  function balancePaymentBankSubmit() {
    return {
      type: ActionTypes.balance.PAYMENT_BANK_SUBMIT
    }
  }
  function balancePaymentBankSubmited( data ) {
    return {
      type: ActionTypes.balance.PAYMENT_BANK_SUBMITTED,
      payload: data
    }
  }


  function balancePaymentTransactionFetch() {
    return {
      type: ActionTypes.balance.PAYMENT_TRANSACTION_FETCH
    }
  }
  function balancePaymentTransactionFetched( data ) {
    return {
      type: ActionTypes.balance.PAYMENT_TRANSACTION_FETCHED,
      payload: data
    }
  }

const actions = {
  balanceNominalSet,
  balanceMethodSet,
  balanceMethodReset,
  balancePaymentInfoVisibility,
  balancePaymentTransactionFetch,
  balancePaymentTransactionFetched,
  balancePaymentBankSubmit,
  balancePaymentBankSubmited
};

export default actions;