import { types } from "../types/patients-types";

const initialState = {};

export const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readPatientById:
      return {
        ...state,
        data:action.payload,
      };
    default:
      return state;
  }
};
