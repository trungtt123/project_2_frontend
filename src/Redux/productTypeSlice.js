import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productTypeService from "../Services/API/productTypeService";
export const getListProductTypes = createAsyncThunk(
  "productType/getListProductTypes",
  async (_, thunkAPI) => {
    try {
      return await productTypeService.getListProductTypes();
    } catch (e) {
      console.log("error", e);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const getProductType = createAsyncThunk(
  "productType/getProductType",
  async (id, thunkAPI) => {
    try {
      return await productTypeService.getProductTypeById(id);
    } catch (e) {
      console.log("error", e);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const initialState = {
  productTypeList: [],
  productType: {},
};

const productTypeSlice = createSlice({
  name: "productType",
  initialState,
  reducers: {},
  extraReducers: {
    [getListProductTypes.pending]: (state) => {
      console.log("pending");
    },
    [getListProductTypes.fulfilled]: (state, action) => {
      console.log("actiion ful", action);
      state.productTypeList = action?.payload?.data;
    },
    [getListProductTypes.rejected]: (state, action) => {
      console.log("action rej", action);
    },
    [getProductType.pending]: (state) => {
      console.log("pending");
    },
    [getProductType.fulfilled]: (state, action) => {
      console.log("actiion ful", action);
      state.productType = action?.payload?.data;
    },
    [getProductType.rejected]: (state, action) => {
      console.log("action rej", action);
    },
  },
});
export const {} = productTypeSlice.actions;

export default productTypeSlice.reducer;
