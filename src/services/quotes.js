import { API } from "../utils/constant";

export const getQuotesByDoctor = async (id) => {
  const response = await fetch(`${API}/quotes/doctors/${id}`);
  return response.json();
};
