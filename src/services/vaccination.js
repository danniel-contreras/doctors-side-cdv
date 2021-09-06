import { API } from "../utils/constant";

export const addNewVaccination = async (values) => {
  const response = await fetch(`${API}/vaccination`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const getVaccinationByPatient = async (id,page) => {
  const response = await fetch(`${API}/vaccination/patient/${id}?page=${page}`);
  return response.json();
};

export const getVaccinationDose = async () => {
  const response = await fetch(`${API}/vaccinationDose`);
  return response.json();
};

export const getVaccinationType = async () => {
  const response = await fetch(`${API}/vaccinationType`);
  return response.json();
};
