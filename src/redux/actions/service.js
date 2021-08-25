import { getServiceById } from "../../services/clinical-services";
import { types } from "../types/clinical-services";

export const readServiceById = (id) => {
  return (dispatch) => {
    getServiceById(id).then((res) => {
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
    type: types.readServiceById,
    payload: data,
  };
}
