import { API } from "../utils/constant";
import { getToken } from "./token";
import axios from "axios";

export const addNewResult = async (values) => {
  const response = await fetch(`${API}/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const getResultsByQuote = async (id) => {
  const response = await fetch(`${API}/results/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const editQuote = async (id, quote) => {
  const data = { ...quote, state: true };
  const response = await fetch(`${API}/quotes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const addPhotoToResult = async (file, id) => {
  const formData = new FormData();
  formData.append("upload", file);
  formData.append("resultsId", id);
  const response = await fetch(`${API}/photo`, {
    headers: { token: getToken() },
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const showImage = (name) => {
  return `${API}/results/view-image?name=${name}`;
};

export const putResult = async (values) => {
  const response = await fetch(`${API}/results/${values.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const getPhotos = async (result,page=1) => {
  const response = await fetch(`${API}/photo/result?id=${result}&page=${page}`);
  return response.json();
};

export const getUrlPhoto = async (name) => {
  const res = axios.get(`${API}/photo?name=${name}`);
  return res;
};
