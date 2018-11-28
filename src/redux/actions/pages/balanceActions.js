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
  function balancePaymentBankSubmitted( data ) {
    return {
      type: ActionTypes.balance.PAYMENT_BANK_SUBMITTED,
      payload: data
    };
  }
  function balancePaymentBankReset() {
    return {
      type: ActionTypes.balance.PAYMENT_BANK_RESET
    };
  }


  function balancePaymentTransactionFetch( deposit_id ) {
    return {
      type: ActionTypes.balance.PAYMENT_TRANSACTION_FETCH,
      payload: { deposit_id }
    }
  }
  function balancePaymentTransactionFetched( data ) {
    return {
      type: ActionTypes.balance.PAYMENT_TRANSACTION_FETCHED,
      payload: data
    }
  }
  function balancePaymentTransactionReset() {
    return {
      type: ActionTypes.balance.PAYMENT_TRANSACTION_RESET
    }
  }

const actions = {
  balanceNominalSet,
  balanceMethodSet,
  balanceMethodReset,
  balancePaymentInfoVisibility,
  balancePaymentTransactionFetch,
  balancePaymentTransactionFetched,
  balancePaymentTransactionReset,
  balancePaymentBankSubmit,
  balancePaymentBankSubmitted,
  balancePaymentBankReset
};

export default actions;