import { API } from "../utils/constant";

export const addNewDeworming = async (values) => {
  const response = await fetch(`${API}/deworming`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const getDewormingByPatient = async (id) => {
  const response = await fetch(`${API}/deworming/patient/${id}`);
  return response.json();
};

export const getDewormingType = async () => {
  const response = await fetch(`${API}/dewormingType`);
  return response.json();
};