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

export const getQuotesByPatient = async (id) => {
  const response = await fetch(`${API}/quotes/patients/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const getQuotesInterval = async (id, consult, page) => {
  const response =
    consult !== ""
      ? await fetch(
          `${API}/quotes/interval/${id}?consult=${consult}&page=${page}`,
          { headers: { token: getToken() } }
        )
      : await fetch(`${API}/quotes/interval/${id}?page=${page}`, {
          headers: { token: getToken() },
        });
  return response.json();
};
