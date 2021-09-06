import {
  getQuotesByDoctor,
  getQuotesByPatient,
  getQuotesInterval,
} from "../../services/quotes";
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

export const readQuotesByInterval = (id, consult,page) => {
  return (dispatch) => {
    if(consult !== ""){
      page = 1
    }
    getQuotesInterval(id, consult,page).then((res) => {
      if (!res.ok) {
        dispatch(readByInterval({}));
        return;
      }
      dispatch(readByInterval(res));
    });
  };
};

export function readByDoctor(data) {
  return {
    type: types.readQuotesByDoctor,
    payload: data,
  };
}

export function readByInterval(data) {
  return {
    type: types.readQuoteByInterval,
    payload: data,
  };
}

export function readByPatient(data) {
  return {
    type: types.readQuotesByPatient,
    payload: data,
  };
}
