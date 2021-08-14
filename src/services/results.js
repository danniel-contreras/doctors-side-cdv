import { API } from "../utils/constant";

export const addNewResult = async (values) => {
  const response = await fetch(`${API}/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return response.json();
};