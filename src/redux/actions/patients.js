import { getAllPatients, getPatientById } from "../../services/patients";
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

export const readAllPatients = (page, name, custom, limit) => {
  return (dispatch) => {
    getAllPatients(page, name, custom, limit).then((res) => {
      if (!res.ok) {
        dispatch(read({}));
        return;
      }
      dispatch(read(res));
    });
  };
};

export function read(data) {
  return {
    type: types.readPatients,
    payload: data,
  };
}
