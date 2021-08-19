import { types } from "../types/pest-control-types";

const initialState = {};

export const pestControlReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addPestControl:
      return {
        ...state,
        data: action.payload,
      };
      case types.readPestControlByPatient:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
