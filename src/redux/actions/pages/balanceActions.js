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




  function balancePaymentBankSubmit( payload ) {
    return {
      type: ActionTypes.balance.PAYMENT_SUBMIT,
      payload
    }
  }
  function balancePaymentBankSubmitted( server_response ) {
    return {
      type: ActionTypes.balance.PAYMENT_SUBMITTED,
      payload: server_response
    };
  }
  function balancePaymentBankReset() {
    return {
      type: ActionTypes.balance.PAYMENT_BANK_RESET
    };
  }
  function balancePaymentBankCancel() {
    return {
      type: ActionTypes.balance.PAYMENT_BANK_CANCELED
    }
  }




  function balancePaymentTransactionFetch( deposit_id ) {
    return {
      type: ActionTypes.balance.PAYMENT_TRANSACTION_FETCH,
      payload: { deposit_id }
    }
  }
  function balancePaymentTransactionFetched( server_response ) {
    return {
      type: ActionTypes.balance.PAYMENT_TRANSACTION_FETCHED,
      payload: server_response
    }
  }
  function balancePaymentTransactionReset() {
    return {
      type: ActionTypes.balance.PAYMENT_TRANSACTION_RESET
    }
  }
  function balancePaymentTransactionCancel() {
    return {
      type: ActionTypes.balance.PAYMENT_TRANSACTION_CANCELED
    }
  }




  function balanceTopUpHistoryFetch() {
    return {
      type: ActionTypes.balance.TOP_UP_HISTORY_FETCH
    }
  }
  function balanceTopUpHistoryFetched( data ) {//data from scroll pagination
    return {
      type: ActionTypes.balance.TOP_UP_HISTORY_FETCHED,
      payload: data
    }
  }
  function balanceTopUpHistoryReset() {
    return {
      type: ActionTypes.balance.TOP_UP_HISTORY_RESET
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
  balancePaymentTransactionCancel,

  balancePaymentBankSubmit,
  balancePaymentBankSubmitted,
  balancePaymentBankReset,
  balancePaymentBankCancel,

  balanceTopUpHistoryFetch,
  balanceTopUpHistoryFetched,
  balanceTopUpHistoryReset
};

export default actions;