import { API } from "../utils/constant";
import { getToken } from "./token";

export const getDoctorById = async (id) => {
  const response = await fetch(`${API}/doctors/users/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
};
