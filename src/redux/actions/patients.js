import { getPatientById } from "../../services/patients";
import { types } from "../types/patients-types";

export const readPatientById = (id) => {
  return (dispatch) => {
    getPatientById(id).then((res) => {
      if (res.msg) {
        dispatch(readById({}));
        return;
      }
      dispatch(readById(res));
    });
  };
};

export function readById(data) {
  return {
    type: types.readPatientById,
    payload: data,
  };
}
