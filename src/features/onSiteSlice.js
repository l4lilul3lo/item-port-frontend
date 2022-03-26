import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responseType: "",
  token: "",
};

export const onSiteSlice = createSlice({
  name: "onSiteResponse",
  initialState,
  reducers: {
    storeResponse: (state, action) => {
      const responseType = action.payload.responseType;
      const token = action.payload.token;
      state.responseType = responseType;
      state.token = token;
    },
  },
});

export const { storeResponse } = onSiteSlice.actions;
export const selectResponseType = (state) => state.onSite.responseType;
export const selectToken = (state) => state.onSite.token;
export default onSiteSlice.reducer;
