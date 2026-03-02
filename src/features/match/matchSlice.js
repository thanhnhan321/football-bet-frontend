import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createMatchRequest,
  deleteMatchRequest,
  fetchMatchesRequest,
  updateScoreRequest,
} from "./matchApi";

export const fetchMatches = createAsyncThunk("matches/fetch", async () => {
  return fetchMatchesRequest();
});

export const createMatch = createAsyncThunk(
  "matches/create",
  async (data, { dispatch }) => {
    await createMatchRequest(data);
    dispatch(fetchMatches());
  },
);

export const updateScore = createAsyncThunk(
  "matches/updateScore",
  async ({ id, home_score, away_score }, { dispatch }) => {
    await updateScoreRequest({ id, home_score, away_score });
    dispatch(fetchMatches());
  },
);

export const deleteMatch = createAsyncThunk(
  "matches/delete",
  async (id, { dispatch }) => {
    await deleteMatchRequest(id);
    dispatch(fetchMatches());
  },
);

const matchSlice = createSlice({
  name: "matches",
  initialState: {
    list: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      });
  },
});

export default matchSlice.reducer;
