import { API } from "../utils/constant";

export const addNewPestControl = async (values) => {
  const response = await fetch(`${API}/pestControl`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const getPestControlByPatient = async (id) => {
  const response = await fetch(`${API}/pestControl/patient/${id}`);
  return response.json();
};

export const getPestControlTypes = async () => {
  const response = await fetch(`${API}/pestControlType`);
  return response.json();
};
