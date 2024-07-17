import { typeEmployee } from "../constants";

export const getAllEmployeesAction = () => {
  return {
    type: typeEmployee.GET_ALL_EMPLOYEE_REQUEST,
  };
};
export const addEmployeeAction = (data) => {
  return {
    type: typeEmployee.ADD_EMPLOYEE_REQUEST,
    payload: data,
  };
};
export const updateEmployeeAction = (id, data) => {
  return {
    type: typeEmployee.UPDATE_EMPLOYEE_REQUEST,
    id: id,
    updateData: data,
  };
};
export const deleteEmployeeAction = (id) => {
  return {
    type: typeEmployee.DELETE_EMPLOYEE_REQUEST,
    payload: id,
  };
};
export const searchEmployeesAction = (keywords) => {
  return {
    type: typeEmployee.SEARCH_EMPLOYEE_REQUEST,
    payload: keywords,
  };
};
