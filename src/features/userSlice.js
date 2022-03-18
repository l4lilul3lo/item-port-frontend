import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    username: "",
    image: "",
  },
  isAuth: localStorage.getItem("isAuth") === "true" ? true : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.userInfo = action.payload;
    },
    authorize: (state) => {
      localStorage.setItem("isAuth", "true");
      state.isAuth = true;
    },

    deauthorize: (state) => {
      localStorage.setItem("isAuth", "false");
      state.isAuth = false;
      state.userInfo = {};
    },
  },
});

export const { authorize, deauthorize, storeUser } = userSlice.actions;
export const selectIsAuth = (state) => state.user.isAuth;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;

// lets talk redirects...
