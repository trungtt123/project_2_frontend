import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});
