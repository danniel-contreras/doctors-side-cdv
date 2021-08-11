import { getDoctorById } from "../../services/doctors";
import { types } from "../types/doctors-types";

export const readDoctorById = (id) => {
  return (dispatch) => {
    getDoctorById(id).then((res) => {
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
    type: types.readDoctorById,
    payload: data,
  };
}
