import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

//Store of redux
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
