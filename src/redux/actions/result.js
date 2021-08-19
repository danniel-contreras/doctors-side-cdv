import { getResultsByQuote } from "../../services/results";
import { types } from "../types/result-types";

export const readResultsByQuote = (id) => {
  return (dispatch) => {
    getResultsByQuote(id).then((res) => {
      if (res?.msg) {
        dispatch(readByQuote({}));
        return;
      }
      dispatch(readByQuote(res?.results));
    });
  };
};

export function readByQuote(data) {
  return {
    type: types.readResultsByQuote,
    payload: data,
  };
}
