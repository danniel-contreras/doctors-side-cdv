import { types } from "../types/pest-control-types";

const initialState = {};

export const pestControlTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readPestControlTypes:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
