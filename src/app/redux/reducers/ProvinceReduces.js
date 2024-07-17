import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  provinces: [],
  districtsByProvince: [],
  reload: false,
};
export const provincesSlice = createSlice({
  name: "provinces",
  initialState,
  reducers: {
    addProvinces: (state, action) => {
      state.provinces = [...state.provinces, action.payload];
    },
    updateProvinces: (state, action) => {
      const { id, ...updatedProvince } = action.payload;
      const index = state.provinces.findIndex((province) => province.id === id);
      if (index !== -1) {
        state.provinces[index] = {
          ...state.provinces[index],
          ...updatedProvince,
        };
      }
    },
    deleteProvincesReducer: (state, action) => {
      state.provinces = state.provinces.filter(
        (province) => province.id !== action.payload
      );
      state.reload = !state.reload;
    },
    showAllProvinces: (state, action) => {
      state.provinces = action.payload;
    },
    searchProvincesReducer: (state, action) => {
      state.provinces = action.payload;
    },
    getDistrictByProvinceReducer: (state, action) => {
      state.districtsByProvince = action.payload;
    },
  },
});
export const {
  addProvinces,
  updateProvinces,
  deleteProvincesReducer,
  showAllProvinces,
  searchProvincesReducer,
  getDistrictByProvinceReducer,
} = provincesSlice.actions;

export default provincesSlice.reducer;
