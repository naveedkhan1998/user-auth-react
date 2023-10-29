import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const standardSlice = createSlice({
  name: "standards",
  initialState,
  reducers: {
    setstandards: (state, action) => {
      state.data = action.payload;
    },
    addstandardStore: (state, action) => {
      state.data.push(action.payload);
    },
    deletestandardStore: (state, action) => {
      const idx = state.standards.findIndex(
        (item) => item.id === action.payload.id
      );
      state.data.splice(idx, 1);
    },
  },
});

export const { setstandards, addstandardStore, deletestandardStore } =
  standardSlice.actions;

export default standardSlice.reducer;

export const getStandardsList = (state) => state.standards.data;
