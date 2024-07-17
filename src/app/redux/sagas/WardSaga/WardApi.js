import axios from "axios";
import ConstantList from "../../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/";

export const getAllWards = async () => {
  const response = await axios.get(API_PATH + "wards/all");
  return response?.data;
};

export const searchWardsApi = async (data) => {
  const response = await axios.post(API_PATH + "wards/page", {
    keyword: data,
  });
  return response?.data;
};

export const addWardsApi = async (data) => {
  const response = await axios.post(API_PATH + "wards", data);
  return response?.data;
};

export const updateWardsApi = async (id, data) => {
  const response = axios.put(API_PATH + "wards/" + id, data);
  return response;
};
export const deleteWardsApi = async (id) => {
  const response = await axios.delete(API_PATH + "wards/" + id);
  return response?.data;
};
