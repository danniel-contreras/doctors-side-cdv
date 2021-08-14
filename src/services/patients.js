import { API } from "../utils/constant";

export const getPatientById = async (id) => {
  const response = await fetch(`${API}/patients/${id}`);
  return response.json();
};

export const showImage = (name) => {
    return `${API}/patients/view-image?name=${name}`;
  };