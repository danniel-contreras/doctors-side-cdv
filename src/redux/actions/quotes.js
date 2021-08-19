import { getQuotesByDoctor, getQuotesByPatient } from "../../services/quotes";
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

export const readQuotesByPatient = (id) => {
  return (dispatch) => {
    getQuotesByPatient(id).then((res) => {
      if (!res.ok) {
        dispatch(readByPatient({}));
        return;
      }
      dispatch(readByPatient(res));
    });
  };
};

export function readByDoctor(data) {
  return {
    type: types.readQuotesByDoctor,
    payload: data,
  };
}

export function readByPatient(data) {
  return {
    type: types.readQuotesByPatient,
    payload: data,
  };
}
