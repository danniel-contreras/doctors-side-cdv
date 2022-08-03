import { API } from "../utils/constant";
import { getToken } from "./token";

export const addNewVaccination = async (values) => {
  const response = await fetch(`${API}/vaccination`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const getVaccinationByPatient = async (id, page) => {
  const response = await fetch(
    `${API}/vaccination/patient/${id}?page=${page}`,
    { headers: { token: getToken() } }
  );
  return response.json();
};

export const getVaccinationDose = async () => {
  const response = await fetch(`${API}/vaccinationDose`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const getVaccinationType = async () => {
  const response = await fetch(`${API}/vaccinationType`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const putVaccination = async (values) => {
  const response = await fetch(`${API}/vaccination/${values.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(values),
  });
  return response.json();
};
