import { API } from "../utils/constant";

export const getDoctorById = async (id) => {
  const response = await fetch(`${API}/doctors/${id}`);
  return response.json();
};
