import { types } from "../types/clinical-services";

const initialState = {};

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readServiceById:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};