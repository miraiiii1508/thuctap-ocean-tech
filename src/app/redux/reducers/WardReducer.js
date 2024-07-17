import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  wards: [],
  reload: false,
};
const wardSlide = createSlice({
  name: "ward",
  initialState,
  reducers: {
    showAllWardReducer: (state, action) => {
      state.wards = action.payload;
    },
    addWardReducer: (state, action) => {
      state.wards = [...state.wards, action.payload];
      state.reload = !state.reload;
    },
    updateWardReducer: (state, action) => {
      const { id, updateData } = action.payload;
      const index = state.wards.findIndex((ward) => ward.id === id);
      if (index !== -1) {
        state.wards[index] = {
          ...state.wards[index],
          ...updateData,
        };
      }
      state.reload = !state.reload;
    },
    deleteWardsReducer: (state, action) => {
      state.wards = state.wards.filter((ward) => ward.id !== action.payload);
      state.reload = !state.reload;
    },
    searchWardReducer: (state, action) => {
      state.wards = action.payload;
    },
  },
});
export const {
  showAllWardReducer,
  addWardReducer,
  updateWardReducer,
  deleteWardsReducer,
  searchWardReducer,
} = wardSlide.actions;
export default wardSlide.reducer;
