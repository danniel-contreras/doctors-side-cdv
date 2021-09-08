import { API } from "../utils/constant";
import { getToken } from "./token";

export const addNewDeworming = async (values) => {
  const response = await fetch(`${API}/deworming`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const getDewormingByPatient = async (id) => {
  const response = await fetch(`${API}/deworming/patient/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const getDewormingType = async () => {
  const response = await fetch(`${API}/dewormingType`, {
    headers: { token: getToken() },
  });
  return response.json();
};
