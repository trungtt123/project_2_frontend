import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import privilegeReducer from "./privilegeSlice";
import productReducer from "./productSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    auth: authReducer,
    privilege: privilegeReducer,
  },
});
