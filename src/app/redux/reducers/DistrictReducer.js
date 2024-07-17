import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  district: [],
  wardsByDistrict: [],
  reload: false,
};
const DistrictSlide = createSlice({
  name: "district",
  initialState,
  reducers: {
    getAllDistrictReducer: (state, action) => {
      state.district = action.payload;
    },
    addDistrictReducer: (state, action) => {
      state.district = [...state.district, action.payload];
      state.reload = !state.reload;
    },
    updateDistrictReducer: (state, action) => {
      const { id, updateState } = action.payload;
      const index = state.district.findIndex((district) => district.id === id);
      if (index !== -1) {
        state.district[index] = {
          ...state.district[index],
          ...updateState,
        };
      }
      state.reload = !state.reload;
    },
    deleteDistrictsReducer: (state, action) => {
      state.district = state.district.filter(
        (district) => district.id !== action.payload
      );
      state.reload = !state.reload;
    },
    searchDistrictReducer: (state, action) => {
      state.district = action.payload;
    },
    getWardsByDistrictReducer: (state, action) => {
      state.wardsByDistrict = action.payload;
    },
  },
});
export const {
  getAllDistrictReducer,
  addDistrictReducer,
  updateDistrictReducer,
  deleteDistrictsReducer,
  searchDistrictReducer,
  getWardsByDistrictReducer,
} = DistrictSlide.actions;
export default DistrictSlide.reducer;
