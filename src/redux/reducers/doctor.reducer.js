import { types } from "../types/doctors-types";

const initialState = {};

export const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readDoctorById:
      return {
        ...state,
        data:action.payload,
      };
    default:
      return state;
  }
};
