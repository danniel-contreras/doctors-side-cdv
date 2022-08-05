import { types } from "../types/quote-types";

const initialState = {
  data: {},
};

export const quoteTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addQuoteType:
      return {
        ...state,
        data: action.payload,
      };
    case types.readQuoteTypes:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
