import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import matchReducer from "../features/match/matchSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  matches: matchReducer,
});

export default rootReducer;
