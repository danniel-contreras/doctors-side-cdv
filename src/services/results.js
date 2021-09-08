import { API } from "../utils/constant";
import { getToken } from "./token";

export const addNewResult = async (values) => {
  const response = await fetch(`${API}/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const getResultsByQuote = async (id) => {
  const response = await fetch(`${API}/results/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const editQuote = async (id, quote) => {
  const data = { ...quote, state: 0 };
  const response = await fetch(`${API}/quotes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(data),
  });
  return response.json();
};
