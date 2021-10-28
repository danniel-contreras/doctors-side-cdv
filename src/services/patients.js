import { API } from "../utils/constant";
import { getToken } from "./token";

export const getPatientById = async (id) => {
  const response = await fetch(`${API}/patients/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const showImage = (name) => {
  return `${API}/patients/view-image?name=${name}`;
};

export const getAllPatients = async (page, name, custom, limit) => {
  const response = await fetch(
    `${API}/patients?names=${name}&limit=${limit}&page=${page}&nameCustomer=${custom}`,
    { headers: { token: getToken() } }
  );
  return response.json();
};
export const showPDF = (name) => {
  return `${API}/patients/view-pdf?name=${name}`;
};
