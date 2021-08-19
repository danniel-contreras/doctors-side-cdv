import { types } from "../types/deworming-types";

const initialState = {};

export const dewormingTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readDewormingTypes:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
