import { types } from "../types/quotes-types";

const initialState = {};

export const quotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readQuotesByDoctor:
      return {
        ...state,
        data: action.payload,
      };
    case types.readQuotesByPatient:
      return {
        ...state,
        data: action.payload,
      };
    case types.readQuoteByInterval:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
