import {
  getVaccinationByPatient,
  getVaccinationDose,
  getVaccinationType,
} from "../../services/vaccination";
import { types } from "../types/vaccination-types";

export const readVaccinationsByPatient = (id) => {
  return (dispatch) => {
    getVaccinationByPatient(id).then((res) => {
      if (res.msg) {
        dispatch(readByPatient({}));
        return;
      }
      dispatch(readByPatient(res));
    });
  };
};

export const addVaccination = (values, id) => {
  return (dispatch) => {
    dispatch(readVaccinationsByPatient(id));
    dispatch(add(values));
  };
};

export function add(data) {
  return {
    type: types.addVaccination,
    payload: data,
  };
}

export function readByPatient(data) {
  return {
    type: types.readVaccinationByPatient,
    payload: data,
  };
}

export const readVaccinationDoses = () => {
  return (dispatch) => {
    getVaccinationDose().then((res) => {
      dispatch(readVaccinationDose(res.vaccinationDose));
    });
  };
};

export function readVaccinationDose(data) {
  return {
    type: types.readVaccinationDose,
    payload: data,
  };
}

export const readVaccinationTypes = () => {
  return (dispatch) => {
    getVaccinationType().then((res) => {
      dispatch(readVaccinationType(res.vaccinationType));
    });
  };
};

export function readVaccinationType(data) {
  return {
    type: types.readVaccinationType,
    payload: data,
  };
}
