import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import privilegeService from "../Services/API/privilegeService";
export const fetchRoleList = createAsyncThunk(
  "privilege/fetchRoleList",
  async (_, thunkAPI) => {
    try {
      return await privilegeService.getRoleList();
    } catch (e) {
      console.log("error", e);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const initialState = {
  privilegeList: [],
  roleList: [],
};
const privilegeSlice = createSlice({
  name: "privilege",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRoleList.pending]: (state) => {
      console.log("pending");
    },
    [fetchRoleList.fulfilled]: (state, action) => {
      console.log("actiion fullfil", action);
      state.roleList = action?.payload?.data;
    },
    [fetchRoleList.rejected]: (state, action) => {
      console.log("action rej", action);
    },
  },
});

export const {} = privilegeSlice.actions;

export default privilegeSlice.reducer;
