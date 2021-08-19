import { types } from "../types/vaccination-types";

const initialState = {};

export const vaccinationTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readVaccinationType:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
