import { API } from "../utils/constant";
import { getToken } from "./token";

export const addNewQuoteType = async (data) => {
  const response = await fetch(`${API}/quotesType`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAllQuoteTypes = async () => {
  const response = await fetch(`${API}/quotesType`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const putQuoteType = async (data, id) => {
  const response = await fetch(`${API}/quotesType/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
