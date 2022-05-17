import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../Services/API/userService";
// import { getAllUsers } from "../Services/MOCK/userService";
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      return await userService.getAllUsers();
    } catch (e) {
      console.log("error", e);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const initialState = {
  userList: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state) => {
      console.log("pending");
      state.isLoading = true;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      console.log("actiion ful", action);
      state.isLoading = false;
      state.userList = action?.payload?.data;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      console.log("action rej", action);
      state.isLoading = false;
    },
  },
});
export const {} = userSlice.actions;

export default userSlice.reducer;
