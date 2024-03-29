import { types } from "../types/patients-types";

const initialState = {};

export const patientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readPatients:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
