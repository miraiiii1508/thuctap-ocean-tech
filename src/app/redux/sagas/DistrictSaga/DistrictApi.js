import axios from "axios";
import ConstantList from "../../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/";

export const getAllDistrictApi = async () => {
  const response = await axios.get(API_PATH + "districts/all");
  return response?.data;
};

export const searchDistrictsApi = async (data) => {
  const response = await axios.post(API_PATH + "districts/page", {
    keyword: data,
  });
  return response?.data;
};

export const addDistrictsApi = async (data) => {
  const response = await axios.post(API_PATH + "districts", data);
  return response?.data;
};

export const updateDistrictsApi = async (id, data) => {
  const response = axios.put(API_PATH + "districts/" + id, data);
  return response;
};

export const deleteDistrictsApi = async (id) => {
  const response = await axios.delete(API_PATH + "districts/" + id);
  return response?.data;
};
export const getWardsByDistrictApi = async (id) => {
  const response = await axios.get(API_PATH + `districts/${id}/wards`);
  return response?.data;
};
