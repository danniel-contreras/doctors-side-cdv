import { types } from "../types/vaccination-types";

const initialState = {};

export const vaccinationDoseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readVaccinationDose:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
