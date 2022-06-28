import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../Services/API/authService";
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const { userName, password } = data;
    return await authService.login(userName, password);
  } catch (e) {
    console.log("error", e);
    return thunkAPI.rejectWithValue("something went wrong");
  }
});
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const accessToken = getAccessToken();
      console.log(accessToken);
      if (!accessToken) {
        authService.logout();
        // throw new Error();
      }
      return await authService.checkToken(getAccessToken());
    } catch (e) {
      console.log("error", e);
      authService.logout();
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});
const storeToke = (token) => {
  console.log(token);
  localStorage.setItem("accessToken", token);
};
const storeUserId = (userId) => {
  localStorage.setItem("userId", userId);
};
const getUserId = () => {
  const userId = localStorage.getItem("userId");
  if (userId !== "undefined" && userId) {
    return userId;
  }
  return "";
};
const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(`Bearer ${localStorage.getItem("accessToken")}`);
  if (accessToken !== "undefined" && accessToken) {
    //console.log('run');
    return accessToken;
  }
  return "";
};
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      console.log("pending");
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      console.log("actiion ful", action.payload.data);
      state.isLoading = false;
      state.user = action?.payload?.data;
      state.isAuthenticated = true;
      storeToke(action?.payload?.data?.token);
      storeUserId(action?.payload?.data?.userId);
    },
    [login.rejected]: (state, action) => {
      console.log("action reject", action);
      state.isLoading = false;
      state.isAuthenticated = false;
      authService.logout();
    },
    [loadUser.pending]: (state) => {
      console.log("pending");
      state.isLoading = true;
    },
    [loadUser.fulfilled]: (state, action) => {
      console.log("actiion ful", action);
      state.isLoading = false;
      state.user = action?.payload?.data;
      console.log("state us", state.user);
      state.isAuthenticated = true;
    },
    [loadUser.rejected]: (state, action) => {
      console.log("action reject", action);
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      logout();
    },
    [logout.fulfilled]: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
