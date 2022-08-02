import { API } from "../utils/constant";
import { getToken } from "./token";
import axios from "axios"

export const getPatientById = async (id) => {
  const response = await fetch(`${API}/patients/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
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
export const showImage = async (name) => {
  const res = axios.get(`${API}/patients/view-img?name=${name}`);
 return res;
};