import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../services/httpClient";

const TOKEN_KEY = "access_token";
const ROLE_KEY = "role_name";
const USERNAME_KEY = "username";

const initialState = {
  token: localStorage.getItem(TOKEN_KEY),
  role: localStorage.getItem(ROLE_KEY),
  username: localStorage.getItem(USERNAME_KEY),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const { data } = await httpClient.post("/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      return {
        token: data.access_token,
        role: data.role_name || "member",
        username: data.username || username,
      };
    } catch (error) {
      const message =
        error?.response?.data?.detail || "Sai tai khoan hoac mat khau.";
      return rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.username = action.payload.username;
        localStorage.setItem(TOKEN_KEY, action.payload.token);
        localStorage.setItem(ROLE_KEY, action.payload.role);
        localStorage.setItem(USERNAME_KEY, action.payload.username);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Dang nhap that bai.";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
