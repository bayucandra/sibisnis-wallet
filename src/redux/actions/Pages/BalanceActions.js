import ActionTypes from "../../action-types";


  function balanceNominalSet( nominal ) {
    return {
      type: ActionTypes.balance.NOMINAL_SET,
      payload: nominal
    }
  }

const actions = {
  balanceNominalSet
};

export default actions;