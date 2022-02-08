import {
  getPestControlByPatient,
  getPestControlTypes,
} from "../../services/pest-control";
import { types } from "../types/pest-control-types";

export const readPestControlByPatient = (id, page = 1) => {
  return (dispatch) => {
    getPestControlByPatient(id, page).then((res) => {
      if (res.msg) {
        dispatch(readByPatient({}));
        return;
      }
      dispatch(readByPatient(res));
    });
  };
};

export const addPestControl = (values, id) => {
  return (dispatch) => {
    dispatch(readPestControlByPatient(id));
    dispatch(add(values));
  };
};

export const readPestControlTypes = () => {
  return (dispatch) => {
    getPestControlTypes().then((res) => {
      if (res.msg) {
        dispatch(readByPatient({}));
        return;
      }
      dispatch(readPestControlType(res.pestControlType));
    });
  };
};

export function add(data) {
  return {
    type: types.addPestControl,
    payload: data,
  };
}

export function readByPatient(data) {
  return {
    type: types.readPestControlByPatient,
    payload: data,
  };
}

export function readPestControlType(data) {
  return {
    type: types.readPestControlTypes,
    payload: data,
  };
}
