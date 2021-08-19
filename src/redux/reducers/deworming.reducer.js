import { types } from "../types/deworming-types";

const initialState = {};

export const dewormingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addDeworming:
      return {
        ...state,
        data: action.payload,
      };
      case types.readDewormingsByPatient:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
