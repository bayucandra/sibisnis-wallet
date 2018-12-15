import actionTypes from "redux/action-types";

  function balanceNominalSet( nominal ) {
    return {
      type: actionTypes.balance.NOMINAL_SET,
      payload: nominal
    }
  }

  function balanceMethodFetch() {
    return {
      type: actionTypes.balance.PAYMENT_METHOD_FETCH
    }
  }
  function balanceMethodFetched( server_response ) {
    return {
      type: actionTypes.balance.PAYMENT_METHOD_FETCHED,
      payload: server_response
    }
  }
  function balanceMethodFetchCanceled() {
    return {
      type: actionTypes.balance.PAYMENT_METHOD_FETCH_CANCELED
    }
  }

  function balanceMethodSet( method ) {
    return {
      type: actionTypes.balance.PAYMENT_METHOD_SET,
      payload: method
    };
  }

  function balanceMethodReset() {
    return {
      type: actionTypes.balance.PAYMENT_METHOD_RESET
    }
  }

  function balancePaymentInfoVisibility() {
    return {
      type: actionTypes.balance.PAYMENT_INFO_VISIBILITY
    }
  }




  function balancePaymentSubmit( payload, option = {} ) {
    return {
      type: actionTypes.balance.PAYMENT_SUBMIT,
      payload,
      option
    }
  }
  function balancePaymentSubmitted( server_response ) {
    return {
      type: actionTypes.balance.PAYMENT_SUBMITTED,
      payload: server_response
    };
  }
  function balancePaymentReset() {
    return {
      type: actionTypes.balance.PAYMENT_RESET
    };
  }
  function balancePaymentCancel() {
    return {
      type: actionTypes.balance.PAYMENT_CANCELED
    }
  }




  function balancePaymentTransactionFetch( id_deposit ) {
    return {
      type: actionTypes.balance.PAYMENT_TRANSACTION_FETCH,
      payload: { id_deposit }
    }
  }
  function balancePaymentTransactionFetched( server_response ) {
    return {
      type: actionTypes.balance.PAYMENT_TRANSACTION_FETCHED,
      payload: server_response
    }
  }
  function balancePaymentTransactionReset() {
    return {
      type: actionTypes.balance.PAYMENT_TRANSACTION_RESET
    }
  }
  function balancePaymentTransactionCancel() {
    return {
      type: actionTypes.balance.PAYMENT_TRANSACTION_CANCELED
    }
  }




  function balanceTopUpHistoryFetch() {
    return {
      type: actionTypes.balance.TOP_UP_HISTORY_FETCH
    }
  }
  function balanceTopUpHistoryFetched( data ) {//data from scroll pagination
    return {
      type: actionTypes.balance.TOP_UP_HISTORY_FETCHED,
      payload: data
    }
  }
  function balanceTopUpHistoryReset() {
    return {
      type: actionTypes.balance.TOP_UP_HISTORY_RESET
    }
  }


export default {
  balanceNominalSet,
  balanceMethodFetch,
  balanceMethodFetched,
  balanceMethodFetchCanceled,
  balanceMethodSet,
  balanceMethodReset,
  balancePaymentInfoVisibility,

  balancePaymentTransactionFetch,
  balancePaymentTransactionFetched,
  balancePaymentTransactionReset,
  balancePaymentTransactionCancel,

  balancePaymentSubmit,
  balancePaymentSubmitted,
  balancePaymentReset,
  balancePaymentCancel,

  balanceTopUpHistoryFetch,
  balanceTopUpHistoryFetched,
  balanceTopUpHistoryReset
};