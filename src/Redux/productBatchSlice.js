import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productBatchService from "../Services/API/productBatchService";
export const getListProductBatches = createAsyncThunk(
  "productBatch/getListProductBatches",
  async (_, thunkAPI) => {
    try {
      return await productBatchService.getListProductBatches();
    } catch (e) {
      console.log("error", e);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const getProductBatch = createAsyncThunk(
  "productBatch/getProductBatch",
  async (id, thunkAPI) => {
    try {
      return await productBatchService.getProductBatchById(id);
    } catch (e) {
      console.log("error", e);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const initialState = {
  productBatchList: [],
  productBatch: {},
};

const productBatchSlice = createSlice({
  name: "productBatch",
  initialState,
  reducers: {},
  extraReducers: {
    [getListProductBatches.pending]: (state) => {
      console.log("pending");
    },
    [getListProductBatches.fulfilled]: (state, action) => {
      console.log("actiion ful", action);
      state.productBatchList = action?.payload?.data;
    },
    [getListProductBatches.rejected]: (state, action) => {
      console.log("action rej", action);
    },
    [getProductBatch.pending]: (state) => {
      console.log("pending");
    },
    [getProductBatch.fulfilled]: (state, action) => {
      console.log("actiion ful", action);
      state.productBatch = action?.payload?.data;
    },
    [getProductBatch.rejected]: (state, action) => {
      console.log("action rej", action);
    },
  },
});
export const {} = productBatchSlice.actions;

export default productBatchSlice.reducer;
