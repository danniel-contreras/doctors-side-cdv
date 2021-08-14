import { getQUoteById } from "../../services/quotes";
import { types } from "../types/quotes-types";

export const readQuoteById = (id) => {
  return (dispatch) => {
    getQUoteById(id).then((res) => {
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
    type: types.readQuoteById,
    payload: data,
  };
}
