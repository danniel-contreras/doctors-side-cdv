import { API } from "../utils/constant";
import { getToken } from "./token";

export const login = async (data) => {
  const response = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const checkIsDoctor = async (id, token) => {
  const response = await fetch(`${API}/doctors/users/${id}`, {
    headers: { token: token },
  });
  return response.json();
};

export const checkIsAdmin = async (id, token) => {
  const response = await fetch(`${API}/users/${id}`, {
    headers: { token: token },
  });
  return response.json();
};

export const getUser = async (id) => {
  const response = await fetch(`${API}/users/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
};
