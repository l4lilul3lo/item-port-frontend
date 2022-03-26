import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responseType: "",
};

export const responseTypeSlice = createSlice({
  name: "responseType",
  initialState,
  reducers: {
    storeResponseType: (state, action) => {
      const responseType = action.payload;

      state.responseType = responseType;
    },
  },
});

export const { storeResponseType } = responseTypeSlice.actions;
export const selectResponseType = (state) => state.responseType.responseType;
export default responseTypeSlice.reducer;
