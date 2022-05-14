import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../Services/API/authService";
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const { userName, passWord } = data;
    return await authService.login(userName, passWord);
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
      if (!accessToken) {
        authService.logout();
        // throw new Error();
      }
      return await authService.checkToken(getUserId());
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
  localStorage.setItem("accessToken", JSON.stringify(token.accessToken));
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
  if (accessToken !== "undefined" && accessToken) {
    return JSON.parse(accessToken);
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
      console.log("actiion ful", action);
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      storeToke();
      storeUserId();
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
      state.user = action.payload;
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
