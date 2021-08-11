import { types } from "../types/quotes-types";

const initialState = {};

export const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readQuotesByDoctor:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
