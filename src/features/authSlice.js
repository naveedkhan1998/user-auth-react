import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: null,
  refresh: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload;
      state.access = access;
      state.refresh = refresh;
    },
    logOut: (state) => {
      state.access = null;
      state.refresh = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const getCurrentToken = (state) => state.auth.access;
export const getCurrentRefreshToken = (state) => state.auth.refresh;
