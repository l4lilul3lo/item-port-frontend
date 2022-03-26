import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import onSiteReducer from "./features/onSiteSlice";
import responseTypeSlice from "./features/responseTypeSlice";
import tokenSlice from "./features/tokenSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    onSite: onSiteReducer,
    token: tokenSlice,
    responseType: responseTypeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
