import { types } from "../types/result-types";

const initialState = {};

export const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readResultsByQuote:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
