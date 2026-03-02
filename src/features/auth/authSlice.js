import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginRequest } from "./authApi";

const TOKEN_KEY = "access_token";
const ROLE_KEY = "role_name";
const USERNAME_KEY = "username";

// initial state of auth reducer when created Redux store
// when reset browser, Redux store reset but local store was not
const initialState = {
  token: localStorage.getItem(TOKEN_KEY),
  role: localStorage.getItem(ROLE_KEY),
  username: localStorage.getItem(USERNAME_KEY),
  loading: false,
  error: null,
};

// createAsyncThunk
// auth/login/pending => call API
// auth/login/fulfilled => call API success
// auth/login/rejected => call API failed
// dispatch send a action to redux store
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await loginRequest({ username, password });

      // where?: action.payload, Redux store, component call this function (dispatch this func)
      return {
        token: data.access_token,
        role: data.role_name || "member",
        username: data.username || username,
      };
      // error handling
    } catch (error) {
      const message =
        // access the property without errors if the value is null or undefined
        error?.response?.data?.detail || "Sai tai khoan hoac mat khau.";
      // return a custom error and include that error in the action.payload of rejected
      return rejectWithValue(message);
    }
  },
);

// state management related to login
// createSlice is a Redux Toolkit function used to create a Redux reducer and action in a single step.
const authSlice = createSlice({
  //used to prefix
  name: "auth",
  //initial state of the web
  initialState,
  // create and handle synchronous actions.
  // (newState) = reducer(oldState, action)
  reducers: {
    // Remove error massage
    clearAuthError(state) {
      state.error = null;
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.username = null;
      state.error = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ROLE_KEY);
      localStorage.removeItem(USERNAME_KEY);
    },
  },
  // handling external actions
  extraReducers: (builder) => {
    builder
      // redux makes pending calls immediately (before the API returns).
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // the API returns
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.username = action.payload.username;
        localStorage.setItem(TOKEN_KEY, action.payload.token);
        localStorage.setItem(ROLE_KEY, action.payload.role);
        localStorage.setItem(USERNAME_KEY, action.payload.username);
      })
      // when failed
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Dang nhap that bai.";
      });
  },
});

// export const logout = authSlice.actions.logout;
// export const clearAuthError = authSlice.actions.clearAuthError;
export const { logout, clearAuthError } = authSlice.actions;

// the store just needs a reducer
// the rest is for component dispatch.
export default authSlice.reducer;
