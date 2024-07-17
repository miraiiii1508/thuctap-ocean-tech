import axios from "axios";
import ConstantList from "../../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/";

export const getAllEmployeesApi = async () => {
  const response = await axios.get(API_PATH + "employees/all");
  return response?.data;
};

export const searchEmployeesApi = async (searchObj) => {
  const response = await axios.post(API_PATH + "employees/page", searchObj);
  return response;
};
export const addEmployeesApi = async (data) => {
  const response = await axios.post(API_PATH + "employees", data);
  return response?.data;
};
export const updateEmployeesApi = async (id, data) => {
  const response = axios.put(API_PATH + "employees/" + id, data);
  return response;
};
export const deleteEmployeesApi = async (id) => {
  const response = await axios.delete(API_PATH + "employees/" + id);
  return response?.data;
};
