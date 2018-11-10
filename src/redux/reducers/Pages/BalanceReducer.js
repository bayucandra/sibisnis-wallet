import ActionTypes from "../../action-types";

let state_default = {
  nominal_value: null
};

export default ( state = state_default, action ) => {

  let new_state = {};

  switch ( action.type ) {

    case ActionTypes.balance.NOMINAL_SET:
      new_state = { nominal_value: action.payload };

      return Object.assign( {}, state, new_state );

    default:

      return state;

  }

}