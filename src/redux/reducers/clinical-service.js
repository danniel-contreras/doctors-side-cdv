import { types } from "../types/clinical-services";

const initialState = {
  data: {},
};

export const clinicalServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.readClinicalServices:
      return {
        ...state,
        data: action.payload,
      };
    case types.readServicesByPatient:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
