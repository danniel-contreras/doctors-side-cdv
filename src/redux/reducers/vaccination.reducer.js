import { types } from "../types/vaccination-types";

const initialState = {};

export const vaccinationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addVaccination:
      return {
        ...state,
        data: action.payload,
      };
    case types.readVaccinationByPatient:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
