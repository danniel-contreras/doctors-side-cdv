import { API } from "../utils/constant";
export const getAllClinicalServices = async () => {
  const response = await fetch(`${API}/clinicalServices/lista`);
  return response.json();
};

export const getServiceById = async (id) => {
  const response = await fetch(`${API}/clinicalServices/${id}`);
  return response.json();
};


export const addPhotoToService = async (file, id) => {
  const formData = new FormData();
  formData.append("foto", file);
  const response = await fetch(`${API}/clinicalServices/image/${id}`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const getServiceByPatient = async (id) => {
  const response = await fetch(`${API}/clinicalServices/patient/${id}`);
  return response.json();
};

export const showImage = (name) => {
  return `${API}/clinicalServices/view-image?name=${name}`;
};

export const putClinicalService = async (data, id) => {
  const newData = { ...data, state: 1 };
  console.log(newData)
  const response = await fetch(`${API}/clinicalServices/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  return response.json();
};
