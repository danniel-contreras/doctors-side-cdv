import { API } from "../utils/constant";
import { getToken } from "./token";

export const getQuotesByDoctor = async (id) => {
  const response = await fetch(`${API}/quotes/doctors/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const getQUoteById = async (id) => {
  const response = await fetch(`${API}/quotes/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const getQuotesByPatient = async (id,page) => {
  const response = await fetch(`${API}/quotes/patients/${id}?page=${page}&take=10`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const getQuotesInterval = async (id, state) => {
  const response = await fetch(`${API}/quotes/interval/${id}?state=${state}`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const addNewQuote = async (data) => {
  const response = await fetch(`${API}/quotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteQuote = async (data) => {
  const response = await fetch(`${API}/results/delete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};