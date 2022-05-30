import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../Services/API/productService";
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (e) {
      console.log("error", e);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const fetchAllProductType = createAsyncThunk(
  "product/fetchAllProductType",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProductType();
    } catch (e) {
      console.log("error", e);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const initialState = {
  productList: [],
  productTypeList: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllProducts.pending]: (state) => {},
    [fetchAllProducts.fulfilled]: (state, action) => {
      state.productList = action?.payload?.data;
    },
    [fetchAllProducts.rejected]: (state, action) => {},
    [fetchAllProductType.pending]: (state) => {},
    [fetchAllProductType.fulfilled]: (state, action) => {
      state.productTypeList = action?.payload?.data;
    },
    [fetchAllProductType.rejected]: (state, action) => {},
  },
});
export const {} = productSlice.actions;

export default productSlice.reducer;
