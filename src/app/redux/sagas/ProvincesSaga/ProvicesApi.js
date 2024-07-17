import axios from "axios";
import ConstantList from "../../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/";

export const getAllProvinces = async () => {
  const response = await axios.get(API_PATH + "provinces/all");
  return response?.data;
};

export const addProvincesApi = async (data) => {
  const response = await axios.post(API_PATH + "provinces", data);
  return response?.data;
};
export const searchProvincesApi = async (data) => {
  const response = await axios.post(API_PATH + "provinces/page", {
    keyword: data,
  });
  return response?.data;
};
export const updateProvincesApi = async (id, data) => {
  const response = axios.put(API_PATH + "provinces/" + id, data);
  return response;
};
export const deleteProvincesApi = async (id) => {
  const response = await axios.delete(API_PATH + "provinces/" + id);
  return response?.data;
};

export const getDistrictsByProvinces = async (id) => {
  const response = await axios.get(API_PATH + `provinces/${id}/districts`);
  return response?.data;
};
