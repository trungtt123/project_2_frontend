import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import privilegeReducer from "./privilegeSlice";
import productBatchReducer from "./productBatchSlice";
import productReducer from "./productSlice";
import productTypeReducer from "./productTypeSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    privilege: privilegeReducer,
    productBatch: productBatchReducer,
    product: productReducer,
    productTypes: productTypeReducer,
  },
});
