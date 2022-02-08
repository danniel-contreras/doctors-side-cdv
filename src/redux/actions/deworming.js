import {
  getDewormingByPatient,
  getDewormingType,
} from "../../services/deworming";
import { types } from "../types/deworming-types";

export const readDewormingsByPatient = (id, page = 1) => {
  return (dispatch) => {
    getDewormingByPatient(id, page).then((res) => {
      if (res.msg) {
        dispatch(readByPatient({}));
        return;
      }
      dispatch(readByPatient(res));
    });
  };
};

export const addDeworming = (values, id) => {
  return (dispatch) => {
    dispatch(readDewormingsByPatient(id));
    dispatch(add(values));
  };
};

export const readDewormingsTypes = () => {
  return (dispatch) => {
    getDewormingType().then((res) => {
      if (res.msg) {
        dispatch(readByPatient({}));
        return;
      }
      dispatch(readDewormingType(res.dewormingType));
    });
  };
};

export function add(data) {
  return {
    type: types.addDeworming,
    payload: data,
  };
}

export function readByPatient(data) {
  return {
    type: types.readDewormingsByPatient,
    payload: data,
  };
}

export function readDewormingType(data) {
  return {
    type: types.readDewormingTypes,
    payload: data,
  };
}
