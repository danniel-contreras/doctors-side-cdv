import { getAllClinicalServices } from "../../services/clinical-services";
import { types } from "../types/clinical-services";

export const readClinicalServices = () => {
  return (dispatch) => {
    getAllClinicalServices().then((res) => {
      if (res.msg) {
        dispatch(read({}));
        return;
      }
      dispatch(read(res.clinicalService));
    });
  };
};

export function read(data) {
  return {
    type: types.readClinicalServices,
    payload: data,
  };
}
