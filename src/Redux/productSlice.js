import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../Services/API/productService";
// import { getAllProducts } from "../Services/MOCK/productService";
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

const initialState = {
  productList: [],
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllProducts.pending]: (state) => {
      console.log("pending");
      state.isLoading = true;
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      console.log("actiion ful", action);
      state.isLoading = false;
      state.productList = action?.payload?.data;
    },
    [fetchAllProducts.rejected]: (state, action) => {
      console.log("action rej", action);
      state.isLoading = false;
    },
  },
});
export const {} = productSlice.actions;

export default productSlice.reducer;
