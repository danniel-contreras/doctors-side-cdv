import { getUser } from "../../services/auth";
import { types } from "../types/user-types";

export const readEmployeById = (id) => {
  return (dispatch) => {
    getUser(id).then((res) => {
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
    type: types.userReadById,
    payload: data,
  };
}
