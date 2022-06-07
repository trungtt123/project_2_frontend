import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import privilegeReducer from "./privilegeSlice";
import productReducer from "./productSlice";
import productBatchReducer from "./productBatchSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    productBatch: productBatchReducer,
    auth: authReducer,
    privilege: privilegeReducer,
  },
});
