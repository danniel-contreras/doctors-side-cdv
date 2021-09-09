import { API } from "../utils/constant";

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
