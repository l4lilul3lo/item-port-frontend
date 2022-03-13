import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    storeMessage: (state, action) => {
      state.message = action.payload;
    },
    deleteMessage: (state) => {
      state.message = "";
    },
  },
});

export const { storeMessage, deleteMessage } = messageSlice.actions;
export const selectMessage = (state) => state.message.message;
export default messageSlice.reducer;

// now if we have a hook that says useMessage, we can have a function that returns the message!
