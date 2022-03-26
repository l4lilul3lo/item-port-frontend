import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    storeToken: (state, action) => {
      const token = action.payload;
      state.token = token;
    },
  },
});

export const { storeToken } = tokenSlice.actions;
export const selectToken = (state) => state.token.token;

export default tokenSlice.reducer;
