import { getQuotesByDoctor } from "../../services/quotes";
import { types } from "../types/quotes-types";

export const readQuotesByDoctor = (id) => {
  return (dispatch) => {
    getQuotesByDoctor(id).then((res) => {
      if (res.msg) {
        dispatch(readByDoctor({}));
        return;
      }
      dispatch(readByDoctor(res));
    });
  };
};

export function readByDoctor(data) {
  return {
    type: types.readQuotesByDoctor,
    payload: data,
  };
}
