import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  reload: false,
};
export const employeesSlide = createSlice({
  name: "employees",
  initialState,
  reducers: {
    getAllEmployeesReducer: (state, action) => {
      state.employees = action.payload;
    },
    addEmployeeReducer: (state, action) => {
      state.employees = [...state.employees, action.payload];
      state.reload = !state.reload;
    },
    updateEmployeeReducer: (state, action) => {
      const { id, updateData } = action.payload;
      const index = state.employees.findIndex((employee) => employee.id === id);
      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...updateData,
        };
      }
      state.reload = !state.reload;
    },
    deleteEmployeeReducer: (state, action) => {
      const { id } = action.payload;
      state.employees = state.employees.filter(
        (employee) => employee.id !== id
      );
      state.reload = !state.reload;
    },
    searchEmployeesReducer: (state, action) => {
      state.employees = action.payload;
    },
  },
});
export const {
  getAllEmployeesReducer,
  addEmployeeReducer,
  updateEmployeeReducer,
  deleteEmployeeReducer,
  searchEmployeesReducer,
} = employeesSlide.actions;
export default employeesSlide.reducer;
