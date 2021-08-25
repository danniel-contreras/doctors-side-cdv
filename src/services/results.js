import { API } from "../utils/constant";

export const addNewResult = async (values) => {
  const response = await fetch(`${API}/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const getResultsByQuote = async (id) => {
  const response = await fetch(`${API}/results/${id}`);
  return response.json();
};

export const editQuote = async (id, quote) => {
  const data = {...quote,state:0};
  const response = await fetch(`${API}/quotes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
