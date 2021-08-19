import { API } from "../utils/constant";

export const getQuotesByDoctor = async (id) => {
  const response = await fetch(`${API}/quotes/doctors/${id}`);
  return response.json();
};

export const getQUoteById = async (id) => {
  const response = await fetch(`${API}/quotes/${id}`);
  return response.json();
};


export const getQuotesByPatient = async (id)=>{
  const response = await fetch(`${API}/quotes/patients/${id}`)
  return response.json()
}