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

export const getPestControlByPatient = async (id) => {
  const response = await fetch(`${API}/pestControl/patient/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const getPestControlTypes = async () => {
  const response = await fetch(`${API}/pestControlType`, {
    headers: { token: getToken() },
  });
  return response.json();
};
