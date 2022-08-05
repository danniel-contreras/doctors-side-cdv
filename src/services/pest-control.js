import { API } from "../utils/constant";
import { getToken } from "./token";

export const addNewPestControl = async (values) => {
  const response = await fetch(`${API}/pestControl`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const getPestControlByPatient = async (id, page = 1) => {
  const response = await fetch(
    `${API}/pestControl/patient/${id}?page=${page}&take=10`,
    {
      headers: { token: getToken() },
    }
  );
  return response.json();
};

export const getPestControlTypes = async () => {
  const response = await fetch(`${API}/pestControlType`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const putPestControl = async (values) => {
  const response = await fetch(`${API}/pestControl/${values.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const deletePestControl = async (values) => {
  const response = await fetch(`${API}/pestControl/delete`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(values),
  });
  return response.json();
};