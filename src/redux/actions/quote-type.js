import { getAllQuoteTypes } from "../../services/quote-type";
import { types } from "../types/quote-types";

export const addQuoteType = (data) => {
  return (dispatch) => {
    dispatch(add(data));
    dispatch(readQuoteTypes());
  };
};

export function add(data) {
  return {
    type: types.addQuoteType,
    payload: data,
  };
}

export const readQuoteTypes = () => {
  return (dispatch) => {
    getAllQuoteTypes().then((res) => {
      if (res.msg) {
        dispatch(read([]));
        return;
      }
      dispatch(read(res.quotesType));
    });
  };
};

export function read(data) {
  return {
    type: types.readQuoteTypes,
    payload: data,
  };
}
